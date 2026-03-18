import { useMemo } from "react";
import { MapContainer, TileLayer, Tooltip, CircleMarker, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER = [14.8, 75.8];

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

export default function LeafletPlacesMap({
  places,
  selectedCategory,
  center,
  onSelectPlace,
}) {
  const visible = useMemo(() => {
    const filtered = selectedCategory === "All"
      ? places
      : places.filter((p) => p.category === selectedCategory);

    // Only plot places that actually have coordinates.
    return (filtered || []).filter(
      (p) => isFiniteNumber(Number(p.latitude)) && isFiniteNumber(Number(p.longitude))
    );
  }, [places, selectedCategory]);

  const mapCenter = center || DEFAULT_CENTER;

  return (
    <MapContainer
      center={mapCenter}
      zoom={7}
      style={{ width: "100%", height: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />

      <ZoomControl position="bottomright" />

      {visible.map((p) => (
        <CircleMarker
          key={p.id}
          center={[Number(p.latitude), Number(p.longitude)]}
          radius={8}
          pathOptions={{ color: "#38BDF8", fillColor: "#38BDF8", fillOpacity: 0.85 }}
          eventHandlers={{
            click: () => onSelectPlace?.(p),
          }}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={1}>
            <div style={{ fontWeight: 800, fontSize: 12 }}>{p.name}</div>
            <div style={{ fontSize: 10, opacity: 0.85 }}>{p.category}</div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
