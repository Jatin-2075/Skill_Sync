from datetime import datetime, timezone
from sqlalchemy import String, Boolean, DateTime, Text, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    username: Mapped[str] = mapped_column(String(30), unique=True, index=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(128), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    # Profile FK (one-to-one)
    profile: Mapped["Profile"] = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")  # noqa: F821
    skills: Mapped[list["UserSkill"]] = relationship("UserSkill", back_populates="user", cascade="all, delete-orphan")  # noqa: F821
    skill_verifications: Mapped[list["SkillVerification"]] = relationship("SkillVerification", back_populates="user", cascade="all, delete-orphan")  # noqa: F821
    projects: Mapped[list["Project"]] = relationship("Project", back_populates="owner", cascade="all, delete-orphan")  # noqa: F821
    proposals: Mapped[list["Proposal"]] = relationship("Proposal", back_populates="applicant", cascade="all, delete-orphan")  # noqa: F821
    enrollments: Mapped[list["Enrollment"]] = relationship("Enrollment", back_populates="user", cascade="all, delete-orphan")  # noqa: F821
