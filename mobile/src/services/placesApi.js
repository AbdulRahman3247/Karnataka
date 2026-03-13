import { apiDelete, apiGet, apiPost, apiPut } from "./apiClient";

export const fetchPlaces = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiGet(query ? `/places?${query}` : "/places");
};

// Fallback for existing screens: use backend list endpoint
export const fetchNearbyPlaces = () => fetchPlaces();

export const fetchPlaceDetails = (id) => apiGet(`/places/${id}`);
export const submitPlace = (payload) => apiPost("/places", payload);
export const updatePlace = (id, payload) => apiPut(`/places/${id}`, payload);
export const deletePlace = (id) => apiDelete(`/places/${id}`);
