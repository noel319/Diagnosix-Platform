from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.user import User, UserRole
from app.services.auth import get_current_active_user, check_user_role

# Database dependency
def get_db_session():
    return Depends(get_db)

# User dependencies
def get_user():
    return Depends(get_current_active_user)

def get_doctor_user():
    return Depends(check_user_role([UserRole.DOCTOR, UserRole.ADMIN]))

def get_admin_user():
    return Depends(check_user_role([UserRole.ADMIN]))