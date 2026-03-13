import { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import CategoryChip from "../components/CategoryChip";
import PrimaryButton from "../components/PrimaryButton";

export default function ItineraryScreen({ navigation }) {
  const categories = useSelector((state) => state.places.categories);
  const [selected, setSelected] = useState([]);
  const [hours, setHours] = useState("6");
  const [distance, setDistance] = useState("25");

  const toggle = (c) => {
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>AI Itinerary</Text>
      <Text style={styles.text}>Choose preferences to generate your day plan.</Text>

      <Text style={styles.label}>Available hours</Text>
      <TextInput value={hours} onChangeText={setHours} keyboardType="numeric" style={styles.input} />

      <Text style={styles.label}>Max distance (km)</Text>
      <TextInput value={distance} onChangeText={setDistance} keyboardType="numeric" style={styles.input} />

      <Text style={styles.label}>Preferred categories</Text>
      <View style={styles.row}>
        {categories.map((c) => (
          <CategoryChip key={c} label={c} selected={selected.includes(c)} onPress={() => toggle(c)} />
        ))}
      </View>

      <PrimaryButton label="Generate Day Plan" onPress={() => navigation.navigate("DayPlan")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
  },
  content: {
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
  label: {
    ...typography.body,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.clay,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.lg,
  },
});
