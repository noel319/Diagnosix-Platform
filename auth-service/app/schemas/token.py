from typing import Optional

from pydantic import BaseModel

from app.models.user import UserRole


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    sub: Optional[str] = None
    role: Optional[UserRole] = None
    exp: Optional[int] = None


class TokenData(BaseModel):
    username: str
    role: UserRole