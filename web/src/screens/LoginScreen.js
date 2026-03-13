import { Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";
import PageCard from "../components/PageCard";

export default function LoginScreen({ navigation }) {
  return (
    <PageCard scroll={false} contentStyle={styles.center}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue your Karnataka journey.</Text>
      <TextInput placeholder="Email" placeholderTextColor={colors.charcoal} style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor={colors.charcoal} secureTextEntry style={styles.input} />
      <PrimaryButton label="Login" onPress={() => navigation.replace("MainTabs")} />
      <Text style={styles.helper}>New here?</Text>
      <PrimaryButton label="Create account" onPress={() => navigation.navigate("Register")} variant="ghost" />
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
