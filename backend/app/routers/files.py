import logging
import mimetypes

from fastapi import APIRouter, HTTPException
from starlette.responses import Response
from ..database import supabase_admin
import httpx

router = APIRouter()
logger = logging.getLogger(__name__)


@router.api_route("/files/place-images/{object_path:path}", methods=["GET", "HEAD"])
def get_place_image(object_path: str):
    # Restrict to expected prefix to avoid becoming a generic file proxy.
    if not object_path or not object_path.startswith("places/"):
        raise HTTPException(status_code=404, detail="Not found")

    try:
        data = supabase_admin.storage.from_("place-images").download(object_path)
    except Exception as e:
        # Don't lie with 404s: auth/config/network errors should be visible.
        logger.exception("Storage download failed for %s", object_path)
        raise HTTPException(status_code=502, detail="Storage download failed") from e

    content = None
    if isinstance(data, httpx.Response):
        # Some supabase-py versions return an httpx.Response.
        if data.status_code != 200:
            logger.warning(
                "Storage download non-200 for %s: %s %s",
                object_path,
                data.status_code,
                (data.text or "")[:200],
            )
            raise HTTPException(status_code=data.status_code, detail="Not found")
        content = data.content
    elif isinstance(data, (bytes, bytearray)):
        content = bytes(data)
    elif hasattr(data, "data"):
        content = data.data
    elif isinstance(data, dict):
        content = data.get("data")

    if not content:
        raise HTTPException(status_code=404, detail="Not found")

    media_type, _ = mimetypes.guess_type(object_path)
    return Response(
        content=content,
        media_type=media_type or "application/octet-stream",
        headers={"Cache-Control": "public, max-age=3600"},
    )
