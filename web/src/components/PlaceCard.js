import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

export default function PlaceCard({ name, category, distance, rating }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.meta}>{category} • {distance} km</Text>
      <Text style={styles.rating}>⭐ {rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  name: {
    ...typography.subheading,
  },
  meta: {
    ...typography.body,
    marginTop: spacing.xs,
  },
  rating: {
    marginTop: spacing.sm,
    color: colors.leaf,
    fontWeight: "700",
  },
});
