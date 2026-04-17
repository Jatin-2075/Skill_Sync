from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import select
from core.database import get_db
from core.deps import get_current_user, get_optional_user
from models.user import User
from models.project import Project, ProjectSkill, Proposal, Enrollment
from schemas.project import (
    ProjectCreate, ProjectUpdate, ProjectOut,
    ProposalCreate, ProposalOut,
    EnrollmentOut,
)
from services.github import fetch_repo_stats, compute_activity_badge

router = APIRouter(prefix="/projects", tags=["projects"])


# ── Helpers ────────────────────────────────────────────────────────────────────

def _get_project_or_404(project_id: int, db: Session) -> Project:
    project = db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


def _require_owner(project: Project, user: User) -> None:
    if project.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Not the project owner")


# ── List / Search ──────────────────────────────────────────────────────────────

@router.get("/", response_model=list[ProjectOut])
def list_projects(
    q: str | None = Query(None, description="Search title or description"),
    badge: str | None = Query(None, description="Filter by activity_badge"),
    open_only: bool = Query(False),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, le=100),
    db: Session = Depends(get_db),
    _viewer: User | None = Depends(get_optional_user),
):
    stmt = select(Project)

    if q:
        like = f"%{q.lower()}%"
        stmt = stmt.where(
            Project.title.ilike(like) | Project.description.ilike(like)
        )
    if badge:
        stmt = stmt.where(Project.activity_badge == badge)
    if open_only:
        stmt = stmt.where(Project.is_open == True)  # noqa: E712

    stmt = stmt.order_by(Project.score.desc()).offset(skip).limit(limit)
    return db.scalars(stmt).all()


# ── Create ─────────────────────────────────────────────────────────────────────

@router.post("/", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
def create_project(
    payload: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = Project(
        owner_id=current_user.id,
        title=payload.title[:120],
        description=payload.description,
        tech_stack=payload.tech_stack,
        github_url=payload.github_url,
        demo_url=payload.demo_url,
        screenshot_url=payload.screenshot_url,
        is_open=payload.is_open,
    )
    db.add(project)
    db.flush()

    for skill_name in set(payload.tech_stack):
        db.add(ProjectSkill(project_id=project.id, skill=skill_name[:60]))

    db.commit()
    db.refresh(project)
    return project


# ── Single project ─────────────────────────────────────────────────────────────

@router.get("/{project_id}/", response_model=ProjectOut)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
):
    return _get_project_or_404(project_id, db)


# ── Update ─────────────────────────────────────────────────────────────────────

@router.patch("/{project_id}/", response_model=ProjectOut)
def update_project(
    project_id: int,
    payload: ProjectUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = _get_project_or_404(project_id, db)
    _require_owner(project, current_user)

    if payload.title is not None:
        project.title = payload.title[:120]
    if payload.description is not None:
        project.description = payload.description
    if payload.tech_stack is not None:
        project.tech_stack = payload.tech_stack
        # Rebuild project skills
        for ps in project.skills:
            db.delete(ps)
        db.flush()
        for skill_name in set(payload.tech_stack):
            db.add(ProjectSkill(project_id=project.id, skill=skill_name[:60]))
    if payload.github_url is not None:
        project.github_url = payload.github_url
    if payload.demo_url is not None:
        project.demo_url = payload.demo_url
    if payload.screenshot_url is not None:
        project.screenshot_url = payload.screenshot_url
    if payload.is_open is not None:
        project.is_open = payload.is_open

    db.commit()
    db.refresh(project)
    return project


# ── Delete ─────────────────────────────────────────────────────────────────────

@router.delete("/{project_id}/", status_code=204)
def delete_project(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = _get_project_or_404(project_id, db)
    _require_owner(project, current_user)
    db.delete(project)
    db.commit()


# ── GitHub Sync ────────────────────────────────────────────────────────────────

@router.post("/{project_id}/sync/", response_model=ProjectOut)
async def sync_project(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = _get_project_or_404(project_id, db)
    _require_owner(project, current_user)

    if not project.github_url:
        raise HTTPException(status_code=400, detail="No GitHub URL set for this project")

    try:
        stats = await fetch_repo_stats(project.github_url)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"GitHub API error: {exc}")

    if stats:
        project.stars = stats.get("stars", project.stars)
        project.commits_this_week = stats.get("commits_this_week", project.commits_this_week)
        project.contributors_count = stats.get("contributors_count", project.contributors_count)
        project.issues_closed = stats.get("issues_closed", project.issues_closed)
        project.last_commit_at = stats.get("last_commit_at", project.last_commit_at)

        badge, score = compute_activity_badge(
            project.commits_this_week,
            project.contributors_count,
            project.issues_closed,
            project.last_commit_at,
        )
        project.activity_badge = badge
        project.score = score
        project.synced_at = datetime.now(timezone.utc)

    db.commit()
    db.refresh(project)
    return project


# ── My projects ────────────────────────────────────────────────────────────────

@router.get("/me/owned/", response_model=list[ProjectOut])
def my_projects(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    stmt = select(Project).where(Project.owner_id == current_user.id).order_by(Project.created_at.desc())
    return db.scalars(stmt).all()


# ── Proposals ─────────────────────────────────────────────────────────────────

@router.post("/proposals/", response_model=ProposalOut, status_code=201)
def send_proposal(
    payload: ProposalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = _get_project_or_404(payload.project_id, db)

    if project.owner_id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot apply to your own project")

    # Prevent duplicate proposals
    existing = db.scalars(
        select(Proposal).where(
            Proposal.project_id == payload.project_id,
            Proposal.applicant_id == current_user.id,
        )
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="You already sent a proposal for this project")

    proposal = Proposal(
        project_id=payload.project_id,
        applicant_id=current_user.id,
        role=payload.role[:60],
        skills=payload.skills,
        message=payload.message,
        availability=payload.availability[:30],
    )
    db.add(proposal)
    db.commit()
    db.refresh(proposal)
    return proposal


@router.get("/proposals/mine/", response_model=list[ProposalOut])
def my_proposals(
    current_user: User = Depends(get_current_user),
):
    return current_user.proposals


@router.get("/{project_id}/proposals/", response_model=list[ProposalOut])
def project_proposals(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = _get_project_or_404(project_id, db)
    _require_owner(project, current_user)
    return project.proposals


@router.patch("/proposals/{proposal_id}/", response_model=ProposalOut)
def update_proposal_status(
    proposal_id: int,
    action: str = Query(..., description="accept | reject"),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    proposal = db.get(Proposal, proposal_id)
    if not proposal:
        raise HTTPException(status_code=404, detail="Proposal not found")

    project = _get_project_or_404(proposal.project_id, db)
    _require_owner(project, current_user)

    if action not in ("accept", "reject"):
        raise HTTPException(status_code=400, detail="action must be 'accept' or 'reject'")

    proposal.status = "accepted" if action == "accept" else "rejected"

    if action == "accept":
        # Auto-enroll accepted applicant
        already = db.scalars(
            select(Enrollment).where(
                Enrollment.user_id == proposal.applicant_id,
                Enrollment.project_id == proposal.project_id,
            )
        ).first()
        if not already:
            db.add(Enrollment(
                user_id=proposal.applicant_id,
                project_id=proposal.project_id,
                role=proposal.role,
            ))

    db.commit()
    db.refresh(proposal)
    return proposal


# ── Enrollments ────────────────────────────────────────────────────────────────

@router.get("/enrolled/", response_model=list[EnrollmentOut])
def enrolled_projects(
    current_user: User = Depends(get_current_user),
):
    return current_user.enrollments


@router.post("/{project_id}/leave/", status_code=204)
def leave_project(
    project_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    enrollment = db.scalars(
        select(Enrollment).where(
            Enrollment.user_id == current_user.id,
            Enrollment.project_id == project_id,
        )
    ).first()
    if not enrollment:
        raise HTTPException(status_code=404, detail="Not enrolled in this project")

    db.delete(enrollment)
    db.commit()
