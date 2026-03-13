import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../components/ScreenHeader";
import CategoryChip from "../components/CategoryChip";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { setCategory, clearCategory } from "../store/slices/placesSlice";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.places.categories);
  const selected = useSelector((state) => state.places.selectedCategory);
  const places = useSelector((state) => state.places.places);

  const [region, setRegion] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({});
      setRegion((r) => ({
        ...r,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      }));
    })();
  }, []);

  const filtered = selected === "All" ? places : places.filter((p) => p.category === selected);

  const buildRoute = () => {
    if (!selectedPlace) return;
    setRouteInfo({
      distance: `${selectedPlace.distance} km`,
      eta: `${(selectedPlace.distance * 6).toFixed(0)} min`,
      note: "Directions API placeholder",
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Interactive Map" onBack={() => navigation.goBack()} />

      <View style={styles.mapWrap}>
        <MapView style={styles.map} region={region}>
          {filtered.map((m, idx) => (
            <Marker
              key={m.id}
              coordinate={{
                latitude: region.latitude + 0.01 * (idx + 1),
                longitude: region.longitude + 0.01 * (idx + 1),
              }}
              title={m.name}
              description={`${m.category} • ${m.distance} km`}
              onPress={() => {
                setSelectedPlace(m);
                setRouteInfo(null);
              }}
            />
          ))}
        </MapView>
      </View>

      <Text style={styles.section}>Filter by Category</Text>
      <View style={styles.row}>
        <CategoryChip label="All" selected={selected === "All"} onPress={() => dispatch(clearCategory())} />
        {categories.map((c) => (
          <CategoryChip key={c} label={c} selected={selected === c} onPress={() => dispatch(setCategory(c))} />
        ))}
      </View>

      {selectedPlace ? (
        <View style={styles.card}>
          <Text style={styles.name}>{selectedPlace.name}</Text>
          <Text style={styles.meta}>{selectedPlace.category} • {selectedPlace.distance} km</Text>
          <PrimaryButton
            label="Open Place Detail"
            onPress={() => navigation.navigate("PlaceDetail", { id: selectedPlace.id })}
          />
          <View style={styles.spacer} />
          <PrimaryButton label="Get Directions" onPress={buildRoute} variant="ghost" />
        </View>
      ) : null}

      {routeInfo ? (
        <View style={styles.routeCard}>
          <Text style={styles.routeTitle}>Route Summary</Text>
          <Text style={styles.meta}>Distance: {routeInfo.distance}</Text>
          <Text style={styles.meta}>ETA: {routeInfo.eta}</Text>
          <Text style={styles.note}>{routeInfo.note}</Text>
          <View style={styles.spacer} />
          <PrimaryButton label="Start Navigation (Placeholder)" onPress={() => {}} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
    padding: spacing.lg,
  },
  mapWrap: {
    height: 260,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.clay,
    marginBottom: spacing.lg,
  },
  map: {
    flex: 1,
  },
  section: {
    ...typography.subheading,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
  },
  routeCard: {
    backgroundColor: colors.sky,
    padding: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
  },
  name: {
    ...typography.subheading,
  },
  meta: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  routeTitle: {
    ...typography.subheading,
    marginBottom: spacing.xs,
  },
  note: {
    ...typography.body,
    color: colors.deepBrown,
  },
  spacer: {
    height: spacing.sm,
  },
});
