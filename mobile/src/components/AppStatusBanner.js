import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export default function AppStatusBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>Phase 4 — UI scaffold active (API integration next)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.clay,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  text: {
    color: colors.deepBrown,
    fontSize: 12,
    fontWeight: "600",
  },
});
