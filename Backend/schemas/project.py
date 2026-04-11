from pydantic import BaseModel
from datetime import datetime


class ProjectCreate(BaseModel):
    title: str
    description: str = ""
    tech_stack: list[str] = []
    github_url: str | None = None
    demo_url: str | None = None
    screenshot_url: str | None = None
    is_open: bool = True


class ProjectUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    tech_stack: list[str] | None = None
    github_url: str | None = None
    demo_url: str | None = None
    screenshot_url: str | None = None
    is_open: bool | None = None


class ProjectOut(BaseModel):
    id: int
    owner_id: int
    title: str
    description: str
    tech_stack: list | None
    github_url: str | None
    demo_url: str | None
    screenshot_url: str | None
    score: float
    commits_this_week: int
    contributors_count: int
    issues_closed: int
    stars: int
    last_commit_at: datetime | None
    activity_badge: str
    is_open: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class ProposalCreate(BaseModel):
    project_id: int
    role: str = ""
    skills: list[str] = []
    message: str = ""
    availability: str = ""


class ProposalOut(BaseModel):
    id: int
    project_id: int
    applicant_id: int
    role: str
    skills: list | None
    message: str
    availability: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class EnrollmentOut(BaseModel):
    id: int
    user_id: int
    project_id: int
    role: str
    joined_at: datetime

    model_config = {"from_attributes": True}
