import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../app/component/Home";
import Search from "../app/component/Search";
import { FontAwesome } from "@expo/vector-icons";
import AppNavigator from "./AppNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name="home" size={24} color={color} />;
          },
        }}
        name="HomeScreen"
        component={AppNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome name="search" size={24} color={color} />;
          },
        }}
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
