import { Text, StyleSheet } from "react-native";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import PrimaryButton from "../components/PrimaryButton";
import PageCard from "../components/PageCard";

export default function ListingsScreen({ navigation }) {
  return (
    <PageCard>
      <Text style={styles.title}>Listings</Text>
      <Text style={styles.text}>Browse curated places and businesses.</Text>
      <PrimaryButton label="Search & Filter" onPress={() => navigation.navigate("SearchFilter")} />
    </PageCard>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.heading,
    marginBottom: spacing.md,
  },
  text: {
    ...typography.body,
    marginBottom: spacing.lg,
  },
});
