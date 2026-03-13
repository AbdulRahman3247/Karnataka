import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <PrimaryButton label="Achievements" onPress={() => navigation.navigate("Achievements", { title: "Achievements" })} />
      <View style={styles.spacer} />
      <PrimaryButton label="Reviews" onPress={() => navigation.navigate("ProfileReviews", { title: "Reviews" })} variant="ghost" />
      <View style={styles.spacer} />
      <PrimaryButton label="Language" onPress={() => navigation.navigate("Language", { title: "Language" })} variant="ghost" />
      <View style={styles.spacer} />
      <PrimaryButton label="Notifications" onPress={() => navigation.navigate("Notifications", { title: "Notifications" })} variant="ghost" />
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
    marginBottom: spacing.lg,
  },
  spacer: {
    height: spacing.sm,
  },
});
