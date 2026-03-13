import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";

export default function ListingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listings / Discover</Text>
      <Text style={styles.text}>Browse curated places and businesses.</Text>
      <PrimaryButton label="Search & Filter" onPress={() => navigation.navigate("SearchFilter")} />
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
