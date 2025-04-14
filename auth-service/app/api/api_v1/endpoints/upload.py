import os
import uuid
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, File, UploadFile, status, HTTPException
from minio import Minio
from minio.error import S3Error
from sqlalchemy.orm import Session

from app.core.config import settings
from app.api.deps import get_current_active_user
from app.db.session import get_db
from app.models.user import User


router = APIRouter()

ALLOWED_EXTENSIONS = {".dcm", ".jpg", ".jpeg", ".png", ".pdf"}

def get_minio_client():
    return Minio(
        settings.MINIO_ENDPOINT,
        access_key=settings.MINIO_ACCESS_KEY,
        secret_key=settings.MINIO_SECRET_KEY,
        secure=settings.MINIO_SECURE
    )

def validate_file_extension(filename: str):
    ext = os.path.splitext(filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File extension {ext} is not allowed. Allowed extensions: {', '.join(ALLOWED_EXTENSIONS)}"
        )

@router.post("/upload")
async def upload_file(
    current_user: Annotated[User, Depends(get_current_active_user)],
    file: Annotated[UploadFile, File()],
    db: Session = Depends(get_db)
):
    validate_file_extension(file.filename)
    
    minio_client = get_minio_client()
    
    # Ensure bucket exists
    try:
        if not minio_client.bucket_exists(settings.MINIO_BUCKET_NAME):
            minio_client.make_bucket(settings.MINIO_BUCKET_NAME)
    except S3Error as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error connecting to MinIO: {e.message}"
        )
    
    # Generate unique file ID
    file_id = str(uuid.uuid4())
    file_ext = os.path.splitext(file.filename)[1].lower()
    object_name = f"{file_id}{file_ext}"
    
    try:
        # Upload file to MinIO
        minio_client.put_object(
            bucket_name=settings.MINIO_BUCKET_NAME,
            object_name=object_name,
            data=file.file,
            length=-1,
            part_size=10*1024*1024,
            content_type=file.content_type
        )
        
        # Construct URL (in production, you might use a CDN or proxy URL)
        file_url = f"http://{settings.MINIO_ENDPOINT}/{settings.MINIO_BUCKET_NAME}/{object_name}"
        
        return {
            "id": file_id,
            "url": file_url,
            "filename": file.filename,
            "content_type": file.content_type,
            "uploaded_by": current_user.email,
            "uploaded_at": datetime.utcnow().isoformat()
        }
    except S3Error as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error uploading file: {e.message}"
        )