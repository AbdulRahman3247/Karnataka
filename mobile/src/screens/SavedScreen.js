import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";

export default function SavedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Places</Text>
      <Text style={styles.text}>Keep your favorites for offline access.</Text>
      <PrimaryButton label="Saved Places List" onPress={() => navigation.navigate("SavedList")} />
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
    marginBottom: spacing.md,
  },
  text: {
    ...typography.body,
    marginBottom: spacing.lg,
  },
});
