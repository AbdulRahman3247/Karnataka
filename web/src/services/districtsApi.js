import { apiGet } from "./apiClient";

export const fetchDistricts = () => apiGet("/districts");
export const fetchDistrict = (id) => apiGet(`/districts/${id}`);
