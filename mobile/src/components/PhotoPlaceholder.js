import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export default function PhotoPlaceholder({ label }) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 90,
    borderRadius: 12,
    backgroundColor: colors.sky,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  text: {
    color: colors.deepBrown,
    fontWeight: "600",
    fontSize: 12,
  },
});
