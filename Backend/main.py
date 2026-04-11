from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from core.config import get_settings
from core.database import engine, Base

# Import all models so SQLAlchemy knows about them before create_all
import models  # noqa: F401

from routers import auth, profile, skills, projects, discover

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup (dev-friendly; use Alembic for prod)
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="SkillSync API",
    description="Developer identity + skill proof platform",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS ────────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ─────────────────────────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(skills.router)
app.include_router(projects.router)
app.include_router(discover.router)


# ── Legacy URL compatibility (matches existing frontend API calls) ───────────────
# The frontend calls /api/token/ and /api/token/refresh/
# We re-mount them under /api prefix as well
from fastapi import APIRouter
api_compat = APIRouter(prefix="/api")
api_compat.include_router(auth.router)
app.include_router(api_compat)


@app.get("/", tags=["health"])
def root():
    return {"status": "ok", "app": "SkillSync API", "version": "1.0.0"}


@app.get("/health/", tags=["health"])
def health():
    return {"status": "healthy"}
