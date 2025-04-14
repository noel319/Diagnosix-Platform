from fastapi import APIRouter, Depends, HTTPException

from app.api.deps import get_current_active_user
from app.schemas.user import UserInDB
from app.models.user import User


router = APIRouter()


@router.get("/me", response_model=UserInDB)
def read_user_me(current_user: User = Depends(get_current_active_user)):
    return current_user