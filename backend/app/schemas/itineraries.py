from pydantic import BaseModel, Field
from typing import List, Optional, Any


class ItineraryGenerateRequest(BaseModel):
    district_id: int
    days: int = Field(default=1, ge=1, le=14)
    categories: Optional[List[str]] = None


class ItineraryOut(BaseModel):
    id: int
    user_id: str
    district_id: int
    days: int
    plan: Any
    created_at: str
