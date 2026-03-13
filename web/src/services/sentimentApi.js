import { apiPost } from "./apiClient";

export const analyzeSentiment = (text) => apiPost("/ai/sentiment", { text });
