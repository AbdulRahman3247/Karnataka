import { useCallback, useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../theme/colors";
import ScreenHeader from "../components/ScreenHeader";
import PlaceCard from "../components/PlaceCard";
import PageCard from "../components/PageCard";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";
import { fetchSavedPlaceCards } from "../services/savedApi";
import { toDisplayImageUrl } from "../services/mediaUrl";

export default function SavedListScreen({ navigation }) {
  const [savedPlaces, setSavedPlaces] = useState([]);

  const categoryLabel = (value) => {
    const mapping = {
      restaurant: "Food",
      stay: "Stay",
      generational_shop: "Shops",
      hidden_gem: "Hidden Gems",
      tourist_place: "Tourist",
    };
    return mapping[value] || value;
  };

  const load = useCallback(async () => {
      try {
        const places = await fetchSavedPlaceCards();
        setSavedPlaces(places || []);
      } catch (e) {
        setSavedPlaces([]);
      }
    }, []);

  useEffect(() => {
    load();
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
    <PageCard>
      <ScreenHeader title="Saved Places" onBack={() => navigation.goBack()} />
      {savedPlaces.length === 0 ? (
        <Text style={styles.text}>No saved places yet.</Text>
      ) : (
        savedPlaces.map((p) => (
          <PlaceCard
            key={p.id}
            name={p.name}
            category={categoryLabel(p.category)}
            distance={p.distance}
            rating={p.avg_rating ?? p.rating}
            imageUrl={toDisplayImageUrl(p.image_urls?.[0])}
            onPress={() => navigation.navigate("PlaceDetail", { id: p.id })}
          />
        ))
      )}
    </PageCard>
  );
}

const styles = StyleSheet.create({
  text: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: spacing.xl,
  },
});
