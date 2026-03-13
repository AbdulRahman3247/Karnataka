import { Text, StyleSheet } from "react-native";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";
import PageCard from "../components/PageCard";

export default function OnboardingScreen({ navigation }) {
  return (
    <PageCard scroll={false} contentStyle={styles.center}>
      <Text style={styles.title}>Your Karnataka Story</Text>
      <Text style={styles.subtitle}>Discover authentic food, hidden gems, and generational businesses.</Text>
      <PrimaryButton label="Continue" onPress={() => navigation.navigate("Login")} />
    </PageCard>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
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
