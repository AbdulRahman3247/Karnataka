import { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import CategoryChip from "../components/CategoryChip";
import PrimaryButton from "../components/PrimaryButton";
import { generateItinerary } from "../services/itinerariesApi";

import ScreenHeader from "../components/ScreenHeader";
import PageCard from "../components/PageCard";

export default function ItineraryScreen({ navigation }) {
  const categories = useSelector((state) => state.places.categories);
  const [selected, setSelected] = useState([]);
  const [hours, setHours] = useState("6");
  const [distance, setDistance] = useState("25");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const mapCategory = (label) => {
    const mapping = {
      Food: "restaurant",
      Stay: "stay",
      Shops: "generational_shop",
      "Hidden Gems": "hidden_gem",
      Temples: "tourist_place",
      Nature: "tourist_place",
      "Historical Places": "tourist_place",
      "Local Picks": "hidden_gem",
    };
    return mapping[label] || null;
  };

  const onGenerate = async () => {
    setStatus("loading");
    setError("");
    const days = Math.max(1, Math.ceil((Number(hours) || 6) / 8));
    const categories = selected.map(mapCategory).filter(Boolean);
    try {
      const data = await generateItinerary({
        district_id: 1,
        days,
        categories: categories.length ? categories : null,
      });
      navigation.navigate("DayPlan", { plan: data.plan, days: data.days });
    } catch (e) {
      setError(e.message || "Failed to generate itinerary");
    } finally {
      setStatus("idle");
    }
  };

  const toggle = (c) => {
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  return (
    <PageCard>
      <ScreenHeader title="Generate Personal Trip" onBack={() => navigation.goBack()} />
      <Text style={styles.helper}>Tell us your preferences to craft the perfect day in Karnataka.</Text>

      <Text style={styles.label}>Available Hours</Text>
      <TextInput value={hours} onChangeText={setHours} keyboardType="numeric" style={styles.input} placeholder="e.g. 8" />

      <Text style={styles.label}>Travel Radius (km)</Text>
      <TextInput value={distance} onChangeText={setDistance} keyboardType="numeric" style={styles.input} placeholder="e.g. 50" />

      <Text style={styles.label}>Category Preferences</Text>
      <View style={styles.row}>
        {categories.map((c) => (
          <CategoryChip key={c} label={c} selected={selected.includes(c)} onPress={() => toggle(c)} />
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.footer}>
        <PrimaryButton
          label={status === "loading" ? "Generating..." : "Generate Personal Trip"}
          onPress={onGenerate}
        />
      </View>
    </PageCard>
  );
}

const styles = StyleSheet.create({
  helper: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  label: {
    ...typography.h3,
    fontSize: 16,
    marginBottom: spacing.xs,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...typography.body,
    color: colors.text,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  footer: {
    marginTop: spacing.md,
  },
  error: {
    ...typography.body,
    color: colors.error,
    marginBottom: spacing.md,
  },
});
