import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export default function CategoryChip({ label, selected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected && styles.selected]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: 18,
    backgroundColor: colors.clay,
    marginRight: spacing.sm,
  },
  selected: {
    backgroundColor: colors.saffron,
  },
  text: {
    color: colors.deepBrown,
    fontWeight: "600",
    fontSize: 13,
  },
  textSelected: {
    color: colors.white,
  },
});
