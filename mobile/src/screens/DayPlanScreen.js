import { View, Text, StyleSheet } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import PageCard from "../components/PageCard";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

export default function DayPlanScreen({ navigation, route }) {
  const plan = route?.params?.plan || null;
  const dayKeys = plan ? Object.keys(plan) : [];

  return (
    <PageCard>
      <ScreenHeader title="AI Generated Day Plan" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        {dayKeys.length === 0 ? (
          <>
            <Text style={styles.item}>9:00 AM — Temple Visit</Text>
            <Text style={styles.item}>11:00 AM — Local Breakfast</Text>
            <Text style={styles.item}>1:00 PM — Hidden Lake</Text>
            <Text style={styles.item}>4:00 PM — Historical Fort</Text>
          </>
        ) : (
          dayKeys.map((day) => (
            <View key={day} style={styles.dayBlock}>
              <Text style={styles.dayTitle}>{day}</Text>
              {plan[day].map((place) => (
                <Text key={place.id} style={styles.item}>
                  {place.name} — {place.category}
                </Text>
              ))}
            </View>
          ))
        )}
      </View>
    </PageCard>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: spacing.md,
  },
  item: {
    ...typography.body,
    marginBottom: spacing.sm,
  },
  dayBlock: {
    marginBottom: spacing.lg,
  },
  dayTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
});
