import { View, Text, StyleSheet } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

export default function DayPlanScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScreenHeader title="AI Generated Day Plan" onBack={() => navigation.goBack()} />
      <Text style={styles.item}>9:00 AM — Temple Visit</Text>
      <Text style={styles.item}>11:00 AM — Local Breakfast</Text>
      <Text style={styles.item}>1:00 PM — Hidden Lake</Text>
      <Text style={styles.item}>4:00 PM — Historical Fort</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
    padding: spacing.lg,
  },
  item: {
    ...typography.body,
    marginBottom: spacing.sm,
  },
});
