import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ListingsScreen from "../screens/ListingsScreen";
import ItineraryScreen from "../screens/ItineraryScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Home / Explore" }} />
      <Tab.Screen name="Listings" component={ListingsScreen} options={{ title: "Listings / Discover" }} />
      <Tab.Screen name="Itinerary" component={ItineraryScreen} options={{ title: "AI Itinerary" }} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{ title: "Saved Places" }} />
      <Tab.Screen name="Map" component={MapScreen} options={{ title: "Map" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  );
}
