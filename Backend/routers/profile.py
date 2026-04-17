from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from core.database import get_db
from core.deps import get_current_user, get_optional_user
from models.user import User
from models.profile import Profile, UserSkill, SkillVerification
from schemas.profile import (
    PersonalUpdate, PersonalOut,
    HandlesUpdate, HandlesOut,
    SkillsUpdate, SkillOut,
    GitHubStatsOut, PublicProfileOut,
    SkillVerificationOut,
)
from services.github import fetch_github_stats

router = APIRouter(prefix="/profile", tags=["profile"])


# ── Personal Info ──────────────────────────────────────────────────────────────

@router.get("/personal/", response_model=PersonalOut)
def get_personal(current_user: User = Depends(get_current_user)):
    p = current_user.profile
    if not p:
        return PersonalOut(name=None, email=current_user.email, country=None, gender=None, bio=None)
    return PersonalOut(
        name=p.name,
        email=current_user.email,
        country=p.country,
        gender=p.gender,
        bio=p.bio,
    )


@router.post("/personal/", response_model=PersonalOut)
def update_personal(
    payload: PersonalUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    p = current_user.profile
    if not p:
        p = Profile(user_id=current_user.id)
        db.add(p)

    if payload.name is not None:
        p.name = payload.name[:60]
    if payload.country is not None:
        p.country = payload.country[:50]
    if payload.gender is not None:
        p.gender = payload.gender[:30]
    if payload.bio is not None:
        p.bio = payload.bio[:200]

    db.commit()
    db.refresh(current_user)

    return PersonalOut(
        name=p.name,
        email=current_user.email,
        country=p.country,
        gender=p.gender,
        bio=p.bio,
    )


# ── Coding Handles ─────────────────────────────────────────────────────────────

@router.get("/handles/", response_model=HandlesOut)
def get_handles(current_user: User = Depends(get_current_user)):
    p = current_user.profile
    if not p:
        return HandlesOut(git=None, codeforces=None, leetcode=None)
    return HandlesOut(git=p.github, codeforces=p.codeforces, leetcode=p.leetcode)


@router.post("/handles/", response_model=HandlesOut)
def update_handles(
    payload: HandlesUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    p = current_user.profile
    if not p:
        p = Profile(user_id=current_user.id)
        db.add(p)

    if payload.git is not None:
        p.github = payload.git[:60] or None
    if payload.codeforces is not None:
        p.codeforces = payload.codeforces[:60] or None
    if payload.leetcode is not None:
        p.leetcode = payload.leetcode[:60] or None

    db.commit()
    return HandlesOut(git=p.github, codeforces=p.codeforces, leetcode=p.leetcode)


# ── Skills ─────────────────────────────────────────────────────────────────────

@router.get("/skills/", response_model=list[SkillOut])
def get_skills(current_user: User = Depends(get_current_user)):
    return current_user.skills


@router.post("/skills/", response_model=list[SkillOut])
def update_skills(
    payload: SkillsUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Remove old skills and replace
    for s in current_user.skills:
        db.delete(s)
    db.flush()

    new_skills = []
    seen: set[str] = set()
    for item in payload.skills:
        name = item.skill.strip()[:60]
        if name and name.lower() not in seen:
            seen.add(name.lower())
            skill = UserSkill(user_id=current_user.id, skill=name)
            db.add(skill)
            new_skills.append(skill)

    db.commit()
    for s in new_skills:
        db.refresh(s)
    return new_skills


# ── GitHub Sync ────────────────────────────────────────────────────────────────

@router.post("/github/sync/", response_model=GitHubStatsOut)
async def sync_github(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    p = current_user.profile
    if not p or not p.github:
        raise HTTPException(status_code=400, detail="No GitHub handle set. Add it in handles first.")

    try:
        stats = await fetch_github_stats(p.github)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"GitHub API error: {exc}")

    p.github_stars = stats["github_stars"]
    p.github_repos = stats["github_repos"]
    p.github_languages = stats["github_languages"]
    p.github_contributions = stats["github_contributions"]
    p.github_synced_at = stats["github_synced_at"]

    db.commit()
    db.refresh(p)
    return p


@router.get("/github/stats/", response_model=GitHubStatsOut)
def get_github_stats(current_user: User = Depends(get_current_user)):
    p = current_user.profile
    if not p:
        raise HTTPException(status_code=404, detail="Profile not found")
    return p


# ── Skill Verifications ────────────────────────────────────────────────────────

@router.get("/verifications/", response_model=list[SkillVerificationOut])
def get_verifications(current_user: User = Depends(get_current_user)):
    return current_user.skill_verifications


# ── Public Profile ─────────────────────────────────────────────────────────────

@router.get("/{username}/", response_model=PublicProfileOut)
def public_profile(
    username: str,
    db: Session = Depends(get_db),
    _viewer: User | None = Depends(get_optional_user),
):
    user = db.scalars(
        select(User).where(User.username == username.lower())
    ).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    p = user.profile
    verifications = [v for v in user.skill_verifications if v.passed]

    return PublicProfileOut(
        username=user.username,
        name=p.name if p else None,
        bio=p.bio if p else None,
        country=p.country if p else None,
        avatar_url=p.avatar_url if p else None,
        github=p.github if p else None,
        github_stars=p.github_stars if p else 0,
        github_repos=p.github_repos if p else 0,
        github_languages=p.github_languages if p else None,
        skills=user.skills,
        verifications=verifications,
    )
