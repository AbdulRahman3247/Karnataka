from pydantic import BaseModel


class FavoriteCreate(BaseModel):
    place_id: int


class FavoriteOut(BaseModel):
    id: int
    place_id: int
    user_id: str
    created_at: str
