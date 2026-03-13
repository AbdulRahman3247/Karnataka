import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import CategoryChip from "../components/CategoryChip";
import SectionHeader from "../components/SectionHeader";
import PlaceCard from "../components/PlaceCard";
import PrimaryButton from "../components/PrimaryButton";
import AppStatusBanner from "../components/AppStatusBanner";
import { loadRecommendations } from "../store/slices/recommendationsSlice";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.places.categories);
  const featured = useSelector((state) => state.places.featured);
  const allPlaces = useSelector((state) => state.places.places);
  const recommendedIds = useSelector((state) => state.recommendations.recommended);
  const recStatus = useSelector((state) => state.recommendations.status);
  const recommended = allPlaces.filter((p) => recommendedIds.includes(p.id));

  useEffect(() => {
    dispatch(
      loadRecommendations({
        user_id: "demo",
        lat: 12.9716,
        lng: 77.5946,
        saved_place_ids: [],
        ratings: [],
        categories: [],
      })
    );
  }, [dispatch]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AppStatusBanner />
      <Text style={styles.title}>Home / Explore</Text>
      <Text style={styles.subtitle}>Handpicked local experiences near you</Text>

      <SectionHeader title="Recommended for You" />
      {recStatus === "loading" ? (
        <Text style={styles.text}>Loading recommendations...</Text>
      ) : recStatus === "failed" ? (
        <Text style={styles.text}>Recommendations unavailable. Check AI service.</Text>
      ) : (
        recommended.map((p) => (
          <PlaceCard key={p.id} name={p.name} category={p.category} distance={p.distance} rating={p.rating} />
        ))
      )}

      <SectionHeader title="Categories" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
        {categories.map((c) => (
          <CategoryChip key={c} label={c} />
        ))}
      </ScrollView>

      <View style={styles.section}>
        <SectionHeader title="Nearby Discoveries" action="View all" />
        {featured.map((p) => (
          <PlaceCard key={p.id} name={p.name} category={p.category} distance={p.distance} rating={p.rating} />
        ))}
        <PrimaryButton label="Open Nearby Discoveries" onPress={() => navigation.navigate("Nearby")} />
      </View>

      <View style={styles.mapCard}>
        <Text style={styles.mapTitle}>Interactive Map</Text>
        <Text style={styles.mapText}>Explore with live map markers.</Text>
        <View style={styles.mapActions}>
          <PrimaryButton label="Open Map" onPress={() => navigation.navigate("Map")} />
          <View style={styles.spacer} />
          <PrimaryButton label="Place Detail" onPress={() => navigation.navigate("PlaceDetail")} variant="ghost" />
          <View style={styles.spacer} />
          <PrimaryButton label="Suggest a Place" onPress={() => navigation.navigate("SubmitPlace")} variant="ghost" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    ...typography.heading,
  },
  subtitle: {
    ...typography.body,
    marginBottom: spacing.lg,
  },
  row: {
    marginBottom: spacing.lg,
  },
  section: {
    marginTop: spacing.lg,
  },
  mapCard: {
    backgroundColor: colors.sky,
    padding: spacing.lg,
    borderRadius: 18,
    marginTop: spacing.lg,
  },
  mapTitle: {
    ...typography.subheading,
  },
  mapText: {
    ...typography.body,
    marginTop: spacing.sm,
  },
  mapActions: {
    marginTop: spacing.md,
  },
  spacer: {
    height: spacing.sm,
  },
  text: {
    ...typography.body,
  },
});
