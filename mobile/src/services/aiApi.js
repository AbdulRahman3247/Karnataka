import { apiPost } from "./apiClient";

export const fetchRecommendations = (payload) => apiPost("/ai/recommendations", payload);
