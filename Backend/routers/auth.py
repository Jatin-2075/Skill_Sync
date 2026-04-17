from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from core.database import get_db
from core.security import hash_password, verify_password, create_access_token, create_refresh_token, decode_token
from core.deps import get_current_user
from models.user import User
from models.profile import Profile
from schemas.auth import SignupRequest, LoginRequest, TokenResponse, RefreshRequest, UserOut

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    # Check uniqueness
    existing_user = db.scalars(select(User).where(User.username == payload.username)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")

    existing_email = db.scalars(select(User).where(User.email == payload.email)).first()
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        username=payload.username,
        email=str(payload.email),
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    db.flush()  # get user.id before committing

    # Auto-create blank profile
    profile = Profile(user_id=user.id)
    db.add(profile)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login/", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.scalars(select(User).where(User.username == payload.username.lower())).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account disabled")

    return TokenResponse(
        access=create_access_token(user.id),
        refresh=create_refresh_token(user.id),
    )


# Keep the /api/token/ path the frontend already uses
@router.post("/token/", response_model=TokenResponse, include_in_schema=False)
def login_compat(payload: LoginRequest, db: Session = Depends(get_db)):
    return login(payload, db)


@router.post("/token/refresh/", response_model=TokenResponse)
def refresh_token(payload: RefreshRequest, db: Session = Depends(get_db)):
    user_id = decode_token(payload.refresh, expected_type="refresh")
    user = db.get(User, user_id)
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    return TokenResponse(
        access=create_access_token(user.id),
        refresh=create_refresh_token(user.id),
    )


@router.get("/me/", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    return current_user


@router.delete("/delete-account/", status_code=204)
def delete_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db.delete(current_user)
    db.commit()
