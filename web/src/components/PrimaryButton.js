import { Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export default function PrimaryButton({ label, onPress, variant = "primary" }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.base, variant === "ghost" && styles.ghost]}
    >
      <Text style={[styles.text, variant === "ghost" && styles.ghostText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.saffron,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontWeight: "700",
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.saffron,
  },
  ghostText: {
    color: colors.saffron,
  },
});
