import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { InstrumentsScreen, PortfolioScreen, SearchScreen } from '../screens';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="Instruments"
        component={InstrumentsScreen}
        options={{
          title: 'Instrumentos',
          tabBarLabel: 'Instrumentos',
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          title: 'Portfolio',
          tabBarLabel: 'Portfolio',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Buscar',
          tabBarLabel: 'Buscar',
        }}
      />
    </Tab.Navigator>
  );
}
