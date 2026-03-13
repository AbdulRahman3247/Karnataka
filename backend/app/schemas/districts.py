from pydantic import BaseModel


class DistrictOut(BaseModel):
    id: int
    name: str
    description: str | None = None
