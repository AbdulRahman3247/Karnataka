const MAPS_API_BASE = "https://maps.googleapis.com/maps/api";
const MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

export const getDirections = ({ origin, destination }) => {
  const url = `${MAPS_API_BASE}/directions/json?origin=${origin}&destination=${destination}&key=${MAPS_API_KEY}`;
  return Promise.resolve({ url, note: "Directions API placeholder" });
};
