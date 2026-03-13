import { apiDelete, apiGet, apiPost } from "./apiClient";

export const fetchSavedPlaces = () => apiGet("/favorites");
export const fetchSavedPlaceCards = () => apiGet("/favorites/places");
export const savePlace = (placeId) => apiPost("/favorites", { place_id: placeId });
export const removeSavedPlace = (favoriteId) => apiDelete(`/favorites/${favoriteId}`);
