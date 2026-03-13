import { apiGet, apiPost } from "./apiClient";

export const fetchSavedPlaces = () => apiGet("/saved");
export const savePlace = (placeId) => apiPost("/saved", { place_id: placeId });
