from typing import Dict, Any, List
from fastapi import HTTPException, status

from ..database import supabase_admin, supabase_anon


def generate_itinerary(user_id: str, district_id: int, days: int, categories: List[str] | None) -> Dict[str, Any]:
    query = supabase_anon.table("places").select("id,name,category,address,latitude,longitude").eq("district_id", district_id)
    if categories:
        query = query.in_("category", categories)

    places_result = query.execute()
    places = places_result.data or []
    if not places:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No places found for itinerary")

    # Simple round-robin distribution across days
    plan = {f"Day {i+1}": [] for i in range(days)}
    for idx, place in enumerate(places):
        day_key = f"Day {(idx % days) + 1}"
        plan[day_key].append(place)

    itinerary = {
        "user_id": user_id,
        "district_id": district_id,
        "days": days,
        "plan": plan,
    }

    result = supabase_admin.table("itineraries").insert(itinerary).execute()
    if not result or not result.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to save itinerary")

    return result.data[0]


def list_itineraries(user_id: str) -> List[Dict[str, Any]]:
    result = supabase_admin.table("itineraries").select("id,user_id,district_id,days,plan,created_at").eq("user_id", user_id).order("created_at", desc=True).execute()
    return result.data or []
