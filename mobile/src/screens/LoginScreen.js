import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <PrimaryButton label="Login" onPress={() => navigation.replace("MainTabs")} />
      <View style={styles.spacer} />
      <PrimaryButton label="Create account" onPress={() => navigation.navigate("Register")} variant="ghost" />
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
  spacer: {
    height: spacing.md,
  },
});
