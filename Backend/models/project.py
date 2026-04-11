from datetime import datetime, timezone
from sqlalchemy import String, Integer, ForeignKey, Text, DateTime, Float, Boolean, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from core.database import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    owner_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    tech_stack: Mapped[list | None] = mapped_column(JSON)       # ["React", "FastAPI"]
    github_url: Mapped[str | None] = mapped_column(String(300))
    demo_url: Mapped[str | None] = mapped_column(String(300))
    screenshot_url: Mapped[str | None] = mapped_column(String(300))

    # Activity metrics (synced from GitHub)
    score: Mapped[float] = mapped_column(Float, default=0.0)
    commits_this_week: Mapped[int] = mapped_column(Integer, default=0)
    contributors_count: Mapped[int] = mapped_column(Integer, default=0)
    issues_closed: Mapped[int] = mapped_column(Integer, default=0)
    stars: Mapped[int] = mapped_column(Integer, default=0)
    last_commit_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    activity_badge: Mapped[str] = mapped_column(String(20), default="low")  # trending/active/low/dead
    synced_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    is_open: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    owner: Mapped["User"] = relationship("User", back_populates="projects")  # noqa: F821
    proposals: Mapped[list["Proposal"]] = relationship("Proposal", back_populates="project", cascade="all, delete-orphan")
    enrollments: Mapped[list["Enrollment"]] = relationship("Enrollment", back_populates="project", cascade="all, delete-orphan")
    skills: Mapped[list["ProjectSkill"]] = relationship("ProjectSkill", back_populates="project", cascade="all, delete-orphan")


class ProjectSkill(Base):
    __tablename__ = "project_skills"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    project_id: Mapped[int] = mapped_column(Integer, ForeignKey("projects.id", ondelete="CASCADE"))
    skill: Mapped[str] = mapped_column(String(60))

    project: Mapped["Project"] = relationship("Project", back_populates="skills")


class Proposal(Base):
    __tablename__ = "proposals"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    project_id: Mapped[int] = mapped_column(Integer, ForeignKey("projects.id", ondelete="CASCADE"))
    applicant_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))

    role: Mapped[str] = mapped_column(String(60), default="")
    skills: Mapped[list | None] = mapped_column(JSON)
    message: Mapped[str] = mapped_column(Text, default="")
    availability: Mapped[str] = mapped_column(String(30), default="")
    status: Mapped[str] = mapped_column(String(20), default="pending")  # pending/accepted/rejected

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    project: Mapped["Project"] = relationship("Project", back_populates="proposals")
    applicant: Mapped["User"] = relationship("User", back_populates="proposals")


class Enrollment(Base):
    __tablename__ = "enrollments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    project_id: Mapped[int] = mapped_column(Integer, ForeignKey("projects.id", ondelete="CASCADE"))
    role: Mapped[str] = mapped_column(String(60), default="contributor")

    joined_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    user: Mapped["User"] = relationship("User", back_populates="enrollments")
    project: Mapped["Project"] = relationship("Project", back_populates="enrollments")
