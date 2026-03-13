import mimetypes
import uuid
from typing import Tuple

from fastapi import UploadFile, HTTPException, status

from ..database import supabase_admin
from ..config import settings


BUCKET_NAME = "place-images"


def _guess_extension(filename: str, content_type: str | None) -> str:
    if filename and "." in filename:
        return filename.rsplit(".", 1)[-1].lower()
    if content_type:
        ext = mimetypes.guess_extension(content_type)
        if ext:
            return ext.lstrip(".")
    return "jpg"


def _public_url(path: str) -> str:
    return f"{settings.SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{path}"


def upload_place_image(file: UploadFile) -> Tuple[str, str]:
    if not file:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File is required")

    ext = _guess_extension(file.filename or "", file.content_type)
    object_path = f"places/{uuid.uuid4().hex}.{ext}"

    data = file.file.read()
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty file")

    res = supabase_admin.storage.from_(BUCKET_NAME).upload(
        object_path,
        data,
        {"content-type": file.content_type or "image/jpeg"},
    )

    error = None
    if hasattr(res, "error"):
        error = res.error
    elif isinstance(res, dict):
        error = res.get("error")

    if error:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(error))

    return object_path, _public_url(object_path)
