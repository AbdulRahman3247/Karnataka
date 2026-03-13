import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Incredible Karnataka</Text>
      <Text style={styles.subtitle}>Discover the real Karnataka</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ivory,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...typography.heading,
  },
  subtitle: {
    marginTop: 8,
    color: colors.deepBrown,
  },
});
