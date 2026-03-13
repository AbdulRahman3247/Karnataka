import { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ListingsScreen from "../screens/ListingsScreen";
import ItineraryScreen from "../screens/ItineraryScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";
import NearbyScreen from "../screens/NearbyScreen";
import SearchFilterScreen from "../screens/SearchFilterScreen";
import DayPlanScreen from "../screens/DayPlanScreen";
import SavedListScreen from "../screens/SavedListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import ReviewsListScreen from "../screens/ReviewsListScreen";
import ReviewSubmitScreen from "../screens/ReviewSubmitScreen";
import SubmitPlaceScreen from "../screens/SubmitPlaceScreen";
import ProfileSubScreen from "../screens/ProfileSubScreen";

const Stack = createNativeStackNavigator();

const HEADER_HEIGHT = 72;
const SIDEBAR_WIDTH = 240;
const STRIP_WIDTH = 64;

const NAV_ITEMS = [
  { key: "Home", label: "Explore" },
  { key: "Listings", label: "Listings" },
  { key: "Itinerary", label: "AI Itinerary" },
  { key: "Saved", label: "Saved" },
  { key: "Map", label: "Map" },
  { key: "Profile", label: "Profile" },
];

const ROUTE_TO_SECTION = {
  Home: "Home",
  Listings: "Listings",
  Itinerary: "Itinerary",
  Saved: "Saved",
  Map: "Map",
  Profile: "Profile",
  Nearby: "Home",
  SearchFilter: "Listings",
  DayPlan: "Itinerary",
  SavedList: "Saved",
  PlaceDetail: "Home",
  SubmitPlace: "Home",
  ReviewsList: "Profile",
  ReviewSubmit: "Profile",
  Achievements: "Profile",
  ProfileReviews: "Profile",
  Language: "Profile",
  Notifications: "Profile",
};

export default function WebShell() {
  const { width } = useWindowDimensions();
  const [active, setActive] = useState("Home");
  const [collapsed, setCollapsed] = useState(width < 980);
  const navRef = useRef(null);

  useEffect(() => {
    setCollapsed(width < 980);
  }, [width]);

  const go = (key) => {
    setActive(key);
    navRef.current?.navigate(key);
  };

  const onNavStateChange = (state) => {
    const route = state?.routes?.[state.index];
    if (!route?.name) return;
    const section = ROUTE_TO_SECTION[route.name] || "Home";
    setActive(section);
  };

  const sidebarWidth = collapsed ? STRIP_WIDTH : SIDEBAR_WIDTH;

  return (
    <View style={styles.shell}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{NAV_ITEMS.find((n) => n.key === active)?.label}</Text>
        <Text style={styles.headerMeta}>Incredible Karnataka · Local-first discovery</Text>
      </View>

      <View style={[styles.sidebarWrap, { width: sidebarWidth }]}>
        <View style={[styles.sidebar, collapsed && styles.sidebarCollapsed]}>
          <View style={styles.sidebarTop}>
            <Pressable onPress={() => setCollapsed((v) => !v)} style={styles.hamburger}>
              <Text style={styles.hamburgerText}>≡</Text>
            </Pressable>
            {!collapsed ? (
              <View style={styles.brandWrap}>
                <Text style={styles.brand}>Incredible Karnataka</Text>
                <Text style={styles.tagline}>Local-first discovery</Text>
              </View>
            ) : null}
          </View>

          {!collapsed ? (
            <View style={styles.navList}>
              {NAV_ITEMS.map((item) => (
                <Pressable
                  key={item.key}
                  onPress={() => go(item.key)}
                  style={[styles.navItem, active === item.key && styles.navItemActive]}
                >
                  <Text style={[styles.navText, active === item.key && styles.navTextActive]}>
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </View>

      <View style={[styles.main, { marginLeft: sidebarWidth }]}
      >
        <View style={styles.content}>
          <NavigationIndependentTree>
            <NavigationContainer independent ref={navRef} onStateChange={onNavStateChange}>
              <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Listings" component={ListingsScreen} />
              <Stack.Screen name="Itinerary" component={ItineraryScreen} />
              <Stack.Screen name="Saved" component={SavedScreen} />
              <Stack.Screen name="Map" component={MapScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />

              <Stack.Screen name="Nearby" component={NearbyScreen} />
              <Stack.Screen name="SearchFilter" component={SearchFilterScreen} />
              <Stack.Screen name="DayPlan" component={DayPlanScreen} />
              <Stack.Screen name="SavedList" component={SavedListScreen} />
              <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
              <Stack.Screen name="SubmitPlace" component={SubmitPlaceScreen} />

              <Stack.Screen name="ReviewsList" component={ReviewsListScreen} />
              <Stack.Screen name="ReviewSubmit" component={ReviewSubmitScreen} />

              <Stack.Screen name="Achievements" component={ProfileSubScreen} />
              <Stack.Screen name="ProfileReviews" component={ProfileSubScreen} />
              <Stack.Screen name="Language" component={ProfileSubScreen} />
              <Stack.Screen name="Notifications" component={ProfileSubScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </NavigationIndependentTree>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    backgroundColor: "#12100F",
  },
  header: {
    height: HEADER_HEIGHT,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2A241E",
    backgroundColor: "#161412",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F5EDE1",
  },
  headerMeta: {
    marginTop: 4,
    color: "#CBBDA9",
    fontSize: 12,
  },
  sidebarWrap: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    bottom: 0,
    zIndex: 20,
  },
  sidebar: {
    flex: 1,
    backgroundColor: "#1A1714",
    borderRightWidth: 1,
    borderRightColor: "#2A241E",
    padding: 16,
  },
  sidebarCollapsed: {
    padding: 10,
  },
  sidebarTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  hamburger: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#26211C",
    alignItems: "center",
    justifyContent: "center",
  },
  hamburgerText: {
    fontSize: 18,
    color: "#F5EDE1",
  },
  brandWrap: {
    flex: 1,
  },
  brand: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F5EDE1",
  },
  tagline: {
    marginTop: 2,
    color: "#CBBDA9",
    fontSize: 12,
  },
  navList: {
    marginTop: 16,
  },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "transparent",
  },
  navItemActive: {
    backgroundColor: "#26211C",
  },
  navText: {
    color: "#E6DCCB",
    fontSize: 14,
    fontWeight: "600",
  },
  navTextActive: {
    color: "#FFF3E1",
    fontWeight: "700",
  },
  main: {
    flex: 1,
    backgroundColor: "#12100F",
  },
  content: {
    flex: 1,
  },
});
