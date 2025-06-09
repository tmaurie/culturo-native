import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import ThemeSelectionScreen from "../screens/ThemeSelectionScreen";

export type MainTabsParamList = {
  Home: undefined;
  Profile: undefined;
  ThemeSelection: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();
export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "house";
          else if (route.name === "Profile") iconName = "user";
            else if (route.name === "ThemeSelection") iconName = "graduation-cap";

          return (
            <FontAwesome6
              name={iconName as any}
              size={size}
              color={color}
              solid
            />
          );
        },
          tabBarShowLabel: true,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: "#EEE",
          tabBarStyle: {
              backgroundColor: "#222831",
          },
          headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ThemeSelection" component={ThemeSelectionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
