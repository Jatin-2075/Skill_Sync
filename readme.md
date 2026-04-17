# SkillSync — Developer Identity + Skill Proof Platform

> Resume + GitHub + LinkedIn + Proof of Skills = SkillSync

---

## Quick Start

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # Edit SECRET_KEY at minimum

uvicorn main:app --reload --port 8000
```

API docs at **http://localhost:8000/docs**

### Frontend (React + TypeScript + Vite)

```bash
cd frontend
npm install
npm run dev                     # http://localhost:5173
```

Set `VITE_API_URL=http://localhost:8000` in `frontend/.env` (already the default).

---

## Architecture

```
skillsync/
├── backend/
│   ├── main.py                  # FastAPI app, CORS, lifespan
│   ├── requirements.txt
│   ├── .env.example
│   ├── core/
│   │   ├── config.py            # Pydantic Settings (env vars)
│   │   ├── database.py          # SQLAlchemy engine + get_db
│   │   ├── security.py          # JWT, bcrypt
│   │   └── deps.py              # get_current_user dependency
│   ├── models/
│   │   ├── user.py              # User ORM model
│   │   ├── profile.py           # Profile, UserSkill, SkillVerification
│   │   └── project.py           # Project, ProjectSkill, Proposal, Enrollment
│   ├── schemas/
│   │   ├── auth.py              # Signup/Login/Token Pydantic schemas
│   │   ├── profile.py           # Profile schemas
│   │   └── project.py           # Project/Proposal/Enrollment schemas
│   ├── routers/
│   │   ├── auth.py              # POST /auth/signup|login|token/refresh
│   │   ├── profile.py           # GET|POST /profile/personal|handles|skills
│   │   ├── skills.py            # GET /skills/quiz/{skill}, POST /skills/quiz/submit
│   │   ├── projects.py          # CRUD /projects, proposals, enrollments
│   │   └── discover.py          # GET /discover/developers
│   └── services/
│       ├── quiz_bank.py         # MCQ bank: Python, JS, React, TS, FastAPI, SQL, Docker
│       └── github.py            # GitHub REST API: user stats + repo activity
│
└── frontend/
    └── src/
        ├── App.tsx              # Routes (no BrowserRouter — moved to main.tsx)
        ├── main.tsx             # Single BrowserRouter here
        ├── Config/
        │   ├── Api.ts           # API() helper with JWT auto-refresh
        │   └── Types.ts         # All TypeScript interfaces
        ├── hooks/
        │   └── useProjects.ts   # Project fetch + sync hook
        ├── Components/
        │   └── MainLayout.tsx   # Sidebar nav + header shell
        └── Pages/
            ├── Auth/
            │   ├── Auth.tsx         # Login + Signup (styled)
            │   ├── CreateProfile.tsx # 4-step profile wizard
            │   └── Profile.tsx      # Public profile view
            ├── Dashboard.tsx        # Project activity feed
            ├── Settings.tsx         # Edit profile, handles, notifications
            ├── Discover.tsx         # Recruiter mode — filter devs
            ├── Community.tsx        # Channel chat
            ├── Project/
            │   ├── ShowProject.tsx  # Browse + filter projects
            │   ├── PostProject.tsx  # Create project form
            │   ├── EnrolledProject.tsx # My enrollments
            │   └── Proposal.tsx     # Send proposal form
            └── Skills/
                └── SkillQuiz.tsx    # Quiz flow: select → answer → result + badge
```

---

## API Reference

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/signup/` | Create account → returns UserOut |
| POST | `/auth/login/` | Login → `{access, refresh}` |
| POST | `/auth/token/refresh/` | Exchange refresh for new tokens |
| GET  | `/auth/me/` | Current user info |
| DELETE | `/auth/delete-account/` | Permanently delete account |

### Profile
| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/profile/personal/` | Read or update name/bio/country/gender |
| GET/POST | `/profile/handles/` | Read or update github/codeforces/leetcode |
| GET/POST | `/profile/skills/` | Read or replace skill list |
| GET  | `/profile/github/stats/` | Cached GitHub stats |
| POST | `/profile/github/sync/` | Fetch fresh GitHub stats (live API call) |
| GET  | `/profile/verifications/` | All skill quiz results |
| GET  | `/profile/{username}/` | Public profile (no auth needed) |

### Skill Verification (USP)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/skills/supported/` | List all quizzable skills |
| GET | `/skills/quiz/{skill}/` | Get questions (no answers exposed) |
| POST | `/skills/quiz/submit/` | Submit answers → score + badge + explanations |
| GET | `/skills/my-badges/` | Your passed verifications |
| GET | `/skills/leaderboard/?skill=python` | Top scorers per skill |

### Projects
| Method | Path | Description |
|--------|------|-------------|
| GET | `/projects/` | List all (filter: q, badge, open_only) |
| POST | `/projects/` | Create project |
| GET/PATCH/DELETE | `/projects/{id}/` | Read/update/delete |
| POST | `/projects/{id}/sync/` | Sync GitHub activity → updates badge/score |
| GET | `/projects/me/owned/` | My projects |
| POST | `/projects/proposals/` | Send proposal to a project |
| GET | `/projects/proposals/mine/` | My sent proposals |
| GET | `/projects/{id}/proposals/` | Proposals for my project (owner only) |
| PATCH | `/projects/proposals/{id}/?action=accept` | Accept/reject a proposal |
| GET | `/projects/enrolled/` | Projects I'm enrolled in |
| POST | `/projects/{id}/leave/` | Leave an enrolled project |

### Discover (Recruiter Mode)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/discover/developers/` | Filter by skill, verified_only, country, min_stars |

---

## Supported Skill Quizzes

| Skill | Questions |
|-------|-----------|
| `python` | Generators, args, data structures, type system, time complexity |
| `javascript` | typeof null, closures, Promise.all, strict equality, spread |
| `react` | useEffect, memo, state updates, key prop, hooks |
| `typescript` | Partial, keyof, never, readonly, type vs interface |
| `fastapi` | Depends, path params, status codes, response models |
| `sql` | HAVING, JOIN types, DISTINCT, PRIMARY KEY |
| `docker` | Dockerfile, CMD vs ENTRYPOINT, EXPOSE, volumes |

Pass threshold: **70%** — badge stored on profile permanently (best score kept on retake).

---

## Bugs Fixed from Original Frontend

| File | Bug | Fix |
|------|-----|-----|
| `App.tsx` + `main.tsx` | `BrowserRouter` in both files → double router crash | Removed from `App.tsx`, kept only in `main.tsx` |
| `Settings.tsx` | `import { API } from "./Auth/CreateProfile"` — circular import | Changed to `import { API } from "../Config/Api"` |
| `Config/Api.ts` | Hardcoded empty `API_BASE_URL = ""` — all requests went to frontend port | Set to `http://localhost:8000` with `VITE_API_URL` env override |
| `Dashboard.tsx` | Used `useProjects` hook that didn't exist | Created `hooks/useProjects.ts` |
| `Dashboard.tsx` | Called `fetchAll()` with no `useEffect` → never loaded | Added `useEffect(() => { fetchAll() }, [fetchAll])` |
| `Pages/Project/Porposal.tsx` | Typo in filename, hardcoded `project_id: 1` | Renamed to `Proposal.tsx`, reads `?project_id=` from URL |
| All project pages | Used `fetch("http://localhost:8000/...")` directly | Replaced with `API()` helper for auth + error handling |
| `Auth.tsx` | No styles, called wrong endpoint `/API/auth/signup/` | Styled with design system, fixed to `/auth/signup/` |
| `Profile.tsx` | Fetched `API/profile/me/` with no auth header | Uses `API()` helper + shows GitHub sync button |
| `CreateProfile.tsx` | Imported `API` from itself (circular), used wrong endpoints | Fixed imports + endpoint paths |
| `MainLayout.tsx` | Placeholder grey boxes, no navigation | Full nav sidebar with active states + tooltips |
| `index.css` | Only `@import "tailwindcss"` — missing design system | Added `import "./Css/main.css"` in `main.tsx` |

---

## Environment Variables

### Backend `.env`
```
SECRET_KEY=your-min-32-char-secret-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=7
DATABASE_URL=sqlite:///./skillsync.db
GITHUB_CLIENT_ID=        # optional, for OAuth login later
GITHUB_CLIENT_SECRET=    # optional
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:8000
```

---

## Production Checklist

- [ ] Change `SECRET_KEY` to a random 64-char string
- [ ] Switch `DATABASE_URL` to PostgreSQL: `postgresql://user:pass@host/db`
- [ ] Run migrations with Alembic instead of `create_all`
- [ ] Set `FRONTEND_URL` to your real domain in CORS config
- [ ] Add rate limiting (e.g. `slowapi`) to auth + quiz endpoints
- [ ] Serve frontend build via nginx/CDN
- [ ] Add GitHub OAuth for one-click login
- [ ] Replace SQLite with PostgreSQL for concurrency

---

## Database Schema

```
users           → id, username, email, hashed_password, is_active
profiles        → user_id(fk), name, bio, country, gender, github, github_stars...
user_skills     → user_id(fk), skill
skill_verifications → user_id(fk), skill_name, score, passed, attempts, verified_at
projects        → owner_id(fk), title, description, tech_stack(json), github_url,
                  score, commits_this_week, activity_badge, is_open...
project_skills  → project_id(fk), skill
proposals       → project_id(fk), applicant_id(fk), role, message, status
enrollments     → user_id(fk), project_id(fk), role, joined_at
```
