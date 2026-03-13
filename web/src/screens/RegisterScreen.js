import { Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";
import PageCard from "../components/PageCard";

export default function RegisterScreen({ navigation }) {
  return (
    <PageCard scroll={false} contentStyle={styles.center}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join the local-first discovery community.</Text>
      <TextInput placeholder="Name" placeholderTextColor={colors.charcoal} style={styles.input} />
      <TextInput placeholder="Email" placeholderTextColor={colors.charcoal} style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor={colors.charcoal} secureTextEntry style={styles.input} />
      <PrimaryButton label="Sign up" onPress={() => navigation.replace("MainTabs")} />
      <Text style={styles.helper}>Already have an account?</Text>
      <PrimaryButton label="Back to login" onPress={() => navigation.goBack()} variant="ghost" />
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
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.clay,
  },
  helper: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    color: colors.deepBrown,
    fontSize: 12,
  },
});
