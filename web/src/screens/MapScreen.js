import { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../components/ScreenHeader";
import CategoryChip from "../components/CategoryChip";
import PageCard from "../components/PageCard";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { setCategory, clearCategory } from "../store/slices/placesSlice";
import LeafletPlacesMap from "../components/LeafletPlacesMap";
import PlaceBottomSheet from "../components/PlaceBottomSheet";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.places.categories);
  const selected = useSelector((state) => state.places.selectedCategory);
  const places = useSelector((state) => state.places.places);

  const [userLocation, setUserLocation] = useState(null);
  const [activePlace, setActivePlace] = useState(null);

  const center = useMemo(() => {
    if (!userLocation) return [14.8, 75.8];
    return [userLocation.latitude, userLocation.longitude];
  }, [userLocation]);

  useEffect(() => {
    if (Platform.OS === "web" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => {}
      );
    }
  }, []);

  const handleDirections = (place) => {
    if (!place) return;
    const origin = userLocation ? `${userLocation.latitude},${userLocation.longitude}` : "";
    const destination = `${place.latitude},${place.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    window.open(url, "_blank");
  };

  return (
    <PageCard>
      <ScreenHeader title="Interactive Map" onBack={() => navigation.goBack()} />

      <View style={styles.mapWrap}>
        <LeafletPlacesMap
          places={places}
          selectedCategory={selected}
          center={center}
          onSelectPlace={(p) => setActivePlace(p)}
        />
      </View>

      <Text style={styles.section}>Filter</Text>
      <View style={styles.row}>
        <CategoryChip label="All" selected={selected === "All"} onPress={() => dispatch(clearCategory())} />
        {categories.map((c) => (
          <CategoryChip key={c} label={c} selected={selected === c} onPress={() => dispatch(setCategory(c))} />
        ))}
      </View>

      <PlaceBottomSheet
        place={activePlace}
        onClose={() => setActivePlace(null)}
        onOpenDetails={() => {
          if (!activePlace) return;
          navigation.navigate("PlaceDetail", { id: activePlace.id });
        }}
        onDirections={() => handleDirections(activePlace)}
      />
    </PageCard>
  );
}

const styles = StyleSheet.create({
  mapWrap: {
    height: 450,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    marginBottom: spacing.xl,
    boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
  },
  section: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
});
