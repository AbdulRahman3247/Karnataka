import { apiGet, apiPost } from "./apiClient";

export const generateItinerary = (payload) => apiPost("/generate-itinerary", payload);
export const fetchItineraries = () => apiGet("/itineraries");
