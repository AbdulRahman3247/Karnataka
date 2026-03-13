import { apiGet, apiPost } from "./apiClient";

export const fetchNearbyPlaces = (lat, lng) => apiGet(`/places/nearby?lat=${lat}&lng=${lng}`);
export const fetchPlaceDetails = (id) => apiGet(`/places/${id}`);
export const submitPlace = (payload) => apiPost("/places", payload);
