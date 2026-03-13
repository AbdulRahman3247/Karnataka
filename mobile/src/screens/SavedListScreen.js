import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import ScreenHeader from "../components/ScreenHeader";
import PlaceCard from "../components/PlaceCard";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

export default function SavedListScreen({ navigation }) {
  const savedIds = useSelector((state) => state.saved.saved);
  const places = useSelector((state) => state.places.places);
  const savedPlaces = places.filter((p) => savedIds.includes(p.id));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Saved Places List" onBack={() => navigation.goBack()} />
      {savedPlaces.length === 0 ? (
        <Text style={styles.text}>No saved places yet.</Text>
      ) : (
        savedPlaces.map((p) => (
          <PlaceCard key={p.id} name={p.name} category={p.category} distance={p.distance} rating={p.rating} />
        ))
      )}
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
  text: {
    ...typography.body,
  },
});
