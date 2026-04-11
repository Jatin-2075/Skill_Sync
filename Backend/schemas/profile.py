from pydantic import BaseModel
from datetime import datetime


class PersonalUpdate(BaseModel):
    name: str | None = None
    email: str | None = None
    country: str | None = None
    gender: str | None = None
    bio: str | None = None


class PersonalOut(BaseModel):
    name: str | None
    email: str | None
    country: str | None
    gender: str | None
    bio: str | None

    model_config = {"from_attributes": True}


class HandlesUpdate(BaseModel):
    git: str | None = None
    codeforces: str | None = None
    leetcode: str | None = None


class HandlesOut(BaseModel):
    git: str | None
    codeforces: str | None
    leetcode: str | None

    model_config = {"from_attributes": True}


class SkillIn(BaseModel):
    skill: str


class SkillOut(BaseModel):
    id: int
    skill: str

    model_config = {"from_attributes": True}


class SkillsUpdate(BaseModel):
    skills: list[SkillIn]


class SkillVerificationOut(BaseModel):
    skill_name: str
    score: float
    passed: bool
    attempts: int
    verified_at: datetime | None

    model_config = {"from_attributes": True}


class GitHubStatsOut(BaseModel):
    github: str | None
    github_stars: int
    github_repos: int
    github_languages: dict | None
    github_contributions: int
    github_synced_at: datetime | None

    model_config = {"from_attributes": True}


class PublicProfileOut(BaseModel):
    username: str
    name: str | None
    bio: str | None
    country: str | None
    avatar_url: str | None
    github: str | None
    github_stars: int
    github_repos: int
    github_languages: dict | None
    skills: list[SkillOut]
    verifications: list[SkillVerificationOut]

    model_config = {"from_attributes": True}
