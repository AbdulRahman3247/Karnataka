import { View, ScrollView, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

export default function PageCard({ children, scroll = true, contentStyle, cardStyle }) {
  if (scroll) {
    return (
      <ScrollView style={styles.page} contentContainerStyle={[styles.content, contentStyle]}>
        <View style={[styles.card, cardStyle]}>{children}</View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.page}>
      <View style={[styles.content, contentStyle]}>
        <View style={[styles.card, cardStyle]}>{children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.ivory,
  },
  content: {
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    width: "100%",
    maxWidth: 980,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.clay,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
});
