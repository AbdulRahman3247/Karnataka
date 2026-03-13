import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../components/ScreenHeader";
import CategoryChip from "../components/CategoryChip";
import PrimaryButton from "../components/PrimaryButton";
import PageCard from "../components/PageCard";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { setCategory, clearCategory } from "../store/slices/placesSlice";

const WEB_MAP_URL = "https://maps.google.com/maps?q=Karnataka&z=7&output=embed";

export default function MapScreen({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.places.categories);
  const selected = useSelector((state) => state.places.selectedCategory);
  const places = useSelector((state) => state.places.places);

  const filtered = selected === "All" ? places : places.filter((p) => p.category === selected);

  useEffect(() => {}, []);

  return (
    <PageCard>
      <ScreenHeader title="Interactive Map" onBack={() => navigation.goBack()} />

      <View style={styles.mapWrap}>
        <iframe title="Karnataka Map" src={WEB_MAP_URL} style={styles.iframe} />
      </View>

      <Text style={styles.section}>Filter by Category</Text>
      <View style={styles.row}>
        <CategoryChip label="All" selected={selected === "All"} onPress={() => dispatch(clearCategory())} />
        {categories.map((c) => (
          <CategoryChip key={c} label={c} selected={selected === c} onPress={() => dispatch(setCategory(c))} />
        ))}
      </View>

      <Text style={styles.section}>Nearby Markers</Text>
      {filtered.map((m) => (
        <View key={m.id} style={styles.card}>
          <Text style={styles.name}>{m.name}</Text>
          <Text style={styles.meta}>
            {m.category} • {m.distance} km
          </Text>
          <Text style={styles.meta}>ETA: {(m.distance * 6).toFixed(0)} min</Text>
        </View>
      ))}

      <PrimaryButton label="Get Directions (Placeholder)" onPress={() => {}} />
    </PageCard>
  );
}

const styles = StyleSheet.create({
  mapWrap: {
    height: 260,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.clay,
    marginBottom: spacing.lg,
  },
  iframe: {
    width: "100%",
    height: "100%",
    borderWidth: 0,
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
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.clay,
  },
  name: {
    ...typography.subheading,
  },
  meta: {
    ...typography.body,
  },
});
