import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Karnataka Story</Text>
      <Text style={styles.subtitle}>
        Discover authentic food, hidden gems, and generational businesses.
      </Text>
      <PrimaryButton label="Continue" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
    padding: spacing.lg,
    justifyContent: "center",
  },
  title: {
    ...typography.heading,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
});
