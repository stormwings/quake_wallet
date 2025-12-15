import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { InstrumentsScreen, PortfolioScreen, SearchScreen } from "../screens";
import { copy } from "../i18n/copy";

const Tab = createBottomTabNavigator();

function HeaderTitle() {
  return (
    <View style={styles.headerTitleWrap}>
      <View style={styles.avatarCircle}>
        <Ionicons name="person" size={16} color="#6D28D9" />
      </View>

      <Text style={styles.headerHello} numberOfLines={1}>
        {copy.navigation.greeting(copy.navigation.userPlaceholder())}
      </Text>
    </View>
  );
}

export function TabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#FFFFFF" },
        headerShadowVisible: false,
        headerTitleAlign: "left",
        headerTitle: () => <HeaderTitle />,
        headerRight: () => (
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.7}
              style={styles.iconBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View style={styles.iconWrap}>
                <Ionicons name="notifications-outline" size={22} color="#111827" />
                <View style={styles.notificationDot} />
              </View>
            </TouchableOpacity>
          </View>
        ),

        tabBarActiveTintColor: "#6D28D9",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F1F5F9",
          height: 60 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 10),
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 2,
          marginBottom: Platform.OS === "android" ? 0 : -2,
        },
      }}
    >
      <Tab.Screen
        name="Instruments"
        component={InstrumentsScreen}
        options={{
          title: copy.navigation.instrumentsTitle(),
          tabBarLabel: copy.navigation.instrumentsTitle(),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "trending-up" : "trending-up-outline"}
              size={size ?? 22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          title: copy.navigation.portfolioTitle(),
          tabBarLabel: copy.navigation.portfolioTitle(),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "briefcase" : "briefcase-outline"}
              size={size ?? 22}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: copy.navigation.searchTitle(),
          tabBarLabel: copy.navigation.searchTitle(),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size ?? 22}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3E8FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerHello: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  headerUser: {
    color: "#6D28D9",
    fontWeight: "900",
  },
  headerRight: {
    paddingRight: 15,
  },
  iconWrap: {
    position: "relative",
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationDot: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
});
