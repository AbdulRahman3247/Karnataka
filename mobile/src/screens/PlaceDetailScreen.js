import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../components/ScreenHeader";
import PrimaryButton from "../components/PrimaryButton";
import PhotoPlaceholder from "../components/PhotoPlaceholder";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { toggleSaved } from "../store/slices/savedSlice";

export default function PlaceDetailScreen({ navigation, route }) {
  const placeId = route?.params?.id || "p3";
  const dispatch = useDispatch();
  const isSaved = useSelector((state) => state.saved.saved.includes(placeId));

  return (
    <View style={styles.container}>
      <ScreenHeader title="Place Detail" onBack={() => navigation.goBack()} />
      <Text style={styles.title}>Mysuru Silk House</Text>
      <Text style={styles.meta}>Category: Shops • Rating: 4.5</Text>
      <Text style={styles.desc}>
        Family-run silk store with heritage craftsmanship and curated textiles.
      </Text>

      <Text style={styles.section}>Photos</Text>
      <PhotoPlaceholder label="Place photos (coming soon)" />

      <PrimaryButton
        label={isSaved ? "Remove from Saved" : "Save Place"}
        onPress={() => dispatch(toggleSaved(placeId))}
      />
      <View style={styles.spacer} />
      <PrimaryButton label="Add to Itinerary" onPress={() => navigation.navigate("DayPlan")} variant="ghost" />
      <View style={styles.spacer} />
      <PrimaryButton label="Get Directions" onPress={() => navigation.navigate("Map")} variant="ghost" />
      <View style={styles.spacer} />
      <PrimaryButton label="Read Reviews" onPress={() => navigation.navigate("ReviewsList", { id: placeId })} variant="ghost" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
    padding: spacing.lg,
  },
  title: {
    ...typography.heading,
    marginBottom: spacing.sm,
  },
  meta: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  desc: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  section: {
    ...typography.subheading,
    marginBottom: spacing.sm,
  },
  spacer: {
    height: spacing.sm,
  },
});
