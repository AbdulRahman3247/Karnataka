import { apiGet, apiPost } from "./apiClient";

export const fetchReviews = (placeId) => apiGet(`/reviews/${placeId}`);
export const submitReview = (payload) => apiPost("/reviews", payload);
