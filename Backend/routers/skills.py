from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from pydantic import BaseModel
from core.database import get_db
from core.deps import get_current_user
from models.user import User
from models.profile import SkillVerification
from schemas.profile import SkillVerificationOut
from services.quiz_bank import get_questions, calculate_score, SUPPORTED_SKILLS

router = APIRouter(prefix="/skills", tags=["skill-verification"])

PASS_THRESHOLD = 70.0


class QuestionOut(BaseModel):
    id: str
    question: str
    options: list[dict]  # [{id, text}] — no correct field exposed to client!


class QuizOut(BaseModel):
    skill: str
    questions: list[QuestionOut]
    total: int


class SubmitAnswers(BaseModel):
    skill: str
    answers: dict[str, str]  # {question_id: option_id}


class QuizResult(BaseModel):
    skill: str
    score: float
    correct: int
    total: int
    passed: bool
    badge: str | None  # "Verified {Skill} Dev" if passed
    explanations: list[dict]  # [{question_id, your_answer, correct, explanation}]


@router.get("/supported/", response_model=list[str])
def list_supported_skills():
    """Return all skills that have a quiz available."""
    return SUPPORTED_SKILLS


@router.get("/quiz/{skill}/", response_model=QuizOut)
def get_quiz(skill: str, current_user: User = Depends(get_current_user)):
    questions = get_questions(skill)
    if not questions:
        raise HTTPException(
            status_code=404,
            detail=f"No quiz available for '{skill}'. Supported: {SUPPORTED_SKILLS}",
        )
    # Strip the correct answer before sending to client
    safe_questions = [
        QuestionOut(id=q["id"], question=q["question"], options=q["options"])
        for q in questions
    ]
    return QuizOut(skill=skill.lower(), questions=safe_questions, total=len(safe_questions))


@router.post("/quiz/submit/", response_model=QuizResult)
def submit_quiz(
    payload: SubmitAnswers,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    questions = get_questions(payload.skill)
    if not questions:
        raise HTTPException(status_code=404, detail="Unknown skill")

    score, correct, total = calculate_score(payload.skill, payload.answers)
    passed = score >= PASS_THRESHOLD

    # Upsert verification record
    existing = db.scalars(
        select(SkillVerification).where(
            SkillVerification.user_id == current_user.id,
            SkillVerification.skill_name == payload.skill.lower(),
        )
    ).first()

    if existing:
        existing.attempts += 1
        # Only update score if it improved
        if score > existing.score:
            existing.score = score
            existing.passed = passed
            if passed:
                existing.verified_at = datetime.now(timezone.utc)
    else:
        verification = SkillVerification(
            user_id=current_user.id,
            skill_name=payload.skill.lower(),
            score=score,
            passed=passed,
            attempts=1,
            verified_at=datetime.now(timezone.utc) if passed else None,
        )
        db.add(verification)

    db.commit()

    # Build explanations
    explanations = [
        {
            "question_id": q["id"],
            "question": q["question"],
            "your_answer": payload.answers.get(q["id"], ""),
            "correct": q["correct"],
            "correct_text": next((o["text"] for o in q["options"] if o["id"] == q["correct"]), ""),
            "is_correct": payload.answers.get(q["id"]) == q["correct"],
            "explanation": q["explanation"],
        }
        for q in questions
    ]

    badge = f"Verified {payload.skill.title()} Dev" if passed else None

    return QuizResult(
        skill=payload.skill.lower(),
        score=score,
        correct=correct,
        total=total,
        passed=passed,
        badge=badge,
        explanations=explanations,
    )


@router.get("/my-badges/", response_model=list[SkillVerificationOut])
def my_badges(current_user: User = Depends(get_current_user)):
    return [v for v in current_user.skill_verifications if v.passed]


@router.get("/leaderboard/", response_model=list[dict])
def skill_leaderboard(
    skill: str,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    """Top scorers for a given skill."""
    rows = db.scalars(
        select(SkillVerification)
        .where(SkillVerification.skill_name == skill.lower(), SkillVerification.passed == True)  # noqa: E712
        .order_by(SkillVerification.score.desc())
        .limit(min(limit, 50))
    ).all()

    result = []
    for row in rows:
        user = db.get(User, row.user_id)
        if user:
            result.append({
                "username": user.username,
                "score": row.score,
                "verified_at": row.verified_at.isoformat() if row.verified_at else None,
            })
    return result
