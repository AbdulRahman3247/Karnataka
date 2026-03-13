from typing import List, Dict, Any
from fastapi import HTTPException, status

from ..database import supabase_admin, supabase_anon


def create_review(user_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    insert_data = {**payload, "user_id": user_id}
    result = supabase_admin.table("reviews").insert(insert_data).execute()
    if not result or not result.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Review creation failed")

    # Update average rating for the place
    place_id = payload["place_id"]
    avg = supabase_anon.table("reviews").select("rating").eq("place_id", place_id).execute()
    if avg and avg.data:
        ratings = [r["rating"] for r in avg.data]
        avg_rating = sum(ratings) / len(ratings)
        supabase_admin.table("places").update({"avg_rating": round(avg_rating, 2)}).eq("id", place_id).execute()

    return result.data[0]


def list_reviews(place_id: int) -> List[Dict[str, Any]]:
    result = supabase_anon.table("reviews").select("id,place_id,user_id,rating,comment,created_at").eq("place_id", place_id).order("created_at", desc=True).execute()
    return result.data or []
