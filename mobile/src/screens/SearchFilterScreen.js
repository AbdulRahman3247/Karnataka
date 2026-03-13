import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../components/ScreenHeader";
import CategoryChip from "../components/CategoryChip";
import PlaceCard from "../components/PlaceCard";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { setCategory, clearCategory } from "../store/slices/placesSlice";

export default function SearchFilterScreen({ navigation }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.places.categories);
  const selected = useSelector((state) => state.places.selectedCategory);
  const places = useSelector((state) => state.places.places);

  const filtered = selected === "All" ? places : places.filter((p) => p.category === selected);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ScreenHeader title="Search & Filter" onBack={() => navigation.goBack()} />
      <Text style={styles.helper}>Select a category to filter listings.</Text>

      <View style={styles.row}>
        <CategoryChip
          label="All"
          selected={selected === "All"}
          onPress={() => dispatch(clearCategory())}
        />
        {categories.map((c) => (
          <CategoryChip
            key={c}
            label={c}
            selected={selected === c}
            onPress={() => dispatch(setCategory(c))}
          />
        ))}
      </View>

      {filtered.length === 0 ? (
        <Text style={styles.text}>No places found in this category.</Text>
      ) : (
        filtered.map((p) => (
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
  helper: {
    ...typography.body,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.lg,
  },
  text: {
    ...typography.body,
  },
});
