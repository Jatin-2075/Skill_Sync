from datetime import datetime, timezone
from sqlalchemy import String, Integer, ForeignKey, Text, DateTime, Float, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from core.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)

    name: Mapped[str | None] = mapped_column(String(60))
    country: Mapped[str | None] = mapped_column(String(50))
    gender: Mapped[str | None] = mapped_column(String(30))
    bio: Mapped[str | None] = mapped_column(String(200))
    avatar_url: Mapped[str | None] = mapped_column(String(300))

    # Coding handles
    github: Mapped[str | None] = mapped_column(String(60))
    codeforces: Mapped[str | None] = mapped_column(String(60))
    leetcode: Mapped[str | None] = mapped_column(String(60))

    # GitHub cached data (refreshed on demand)
    github_stars: Mapped[int] = mapped_column(Integer, default=0)
    github_repos: Mapped[int] = mapped_column(Integer, default=0)
    github_languages: Mapped[dict | None] = mapped_column(JSON)  # {"Python": 40, "JS": 30}
    github_contributions: Mapped[int] = mapped_column(Integer, default=0)
    github_synced_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship("User", back_populates="profile")  # noqa: F821


class UserSkill(Base):
    __tablename__ = "user_skills"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    skill: Mapped[str] = mapped_column(String(60), nullable=False)

    user: Mapped["User"] = relationship("User", back_populates="skills")  # noqa: F821


class SkillVerification(Base):
    """Stores result of skill verification test attempts."""
    __tablename__ = "skill_verifications"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    skill_name: Mapped[str] = mapped_column(String(80), nullable=False)

    score: Mapped[float] = mapped_column(Float, default=0.0)          # 0–100
    passed: Mapped[bool] = mapped_column(Boolean, default=False)
    attempts: Mapped[int] = mapped_column(Integer, default=1)
    verified_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    user: Mapped["User"] = relationship("User", back_populates="skill_verifications")  # noqa: F821
