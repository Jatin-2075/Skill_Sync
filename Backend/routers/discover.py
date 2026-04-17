from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import select
from pydantic import BaseModel
from core.database import get_db
from core.deps import get_current_user
from models.user import User
from models.profile import Profile, UserSkill, SkillVerification

router = APIRouter(prefix="/discover", tags=["discover"])


class DevCard(BaseModel):
    username: str
    name: str | None
    country: str | None
    bio: str | None
    github: str | None
    github_stars: int
    top_skills: list[str]
    verified_skills: list[str]
    top_score: float

    model_config = {"from_attributes": True}


@router.get("/developers/", response_model=list[DevCard])
def discover_developers(
    skill: str | None = Query(None, description="Filter by skill name (partial match)"),
    verified_only: bool = Query(False, description="Only show verified skill holders"),
    country: str | None = Query(None),
    min_stars: int = Query(0, ge=0),
    skip: int = Query(0, ge=0),
    limit: int = Query(30, le=100),
    db: Session = Depends(get_db),
    _viewer: User = Depends(get_current_user),
):
    stmt = select(User).join(User.profile)

    if country:
        stmt = stmt.where(Profile.country.ilike(f"%{country}%"))

    if min_stars > 0:
        stmt = stmt.where(Profile.github_stars >= min_stars)

    if skill:
        # Must have the skill listed
        skill_subq = select(UserSkill.user_id).where(
            UserSkill.skill.ilike(f"%{skill}%")
        )
        stmt = stmt.where(User.id.in_(skill_subq))

    if verified_only and skill:
        verified_subq = select(SkillVerification.user_id).where(
            SkillVerification.skill_name.ilike(f"%{skill}%"),
            SkillVerification.passed == True,  # noqa: E712
        )
        stmt = stmt.where(User.id.in_(verified_subq))

    stmt = stmt.offset(skip).limit(limit)
    users = db.scalars(stmt).all()

    result: list[DevCard] = []
    for user in users:
        p = user.profile
        top_skills = [s.skill for s in user.skills[:6]]
        verified_skills = [v.skill_name for v in user.skill_verifications if v.passed]
        top_score = max((v.score for v in user.skill_verifications if v.passed), default=0.0)

        result.append(DevCard(
            username=user.username,
            name=p.name if p else None,
            country=p.country if p else None,
            bio=p.bio if p else None,
            github=p.github if p else None,
            github_stars=p.github_stars if p else 0,
            top_skills=top_skills,
            verified_skills=verified_skills,
            top_score=top_score,
        ))

    # Sort by verified skills count then stars
    result.sort(key=lambda d: (len(d.verified_skills), d.github_stars), reverse=True)
    return result
