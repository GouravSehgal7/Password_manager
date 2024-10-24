import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import icons from @expo/vector-icons

const Tabslayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'addpassword') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'resetmasterpassword') {
            iconName = focused ? 'key' : 'key-outline';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false, // Hide the label under the icons
        tabBarActiveTintColor: '#6a5acd',  // Customize active tab icon color
        tabBarInactiveTintColor: 'gray',   // Customize inactive tab icon color
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerStyle: {
            backgroundColor: '#6a5acd', // Background color for the header
          },
          headerTitle: 'Password List',
          headerTintColor: '#fff', // Color of back button and title
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
      <Tabs.Screen
        name="addpassword"
        options={{
          headerStyle: {
            backgroundColor: '#6a5acd', // Background color for the header
          },
          headerTitle: 'Add Password',
          headerTintColor: '#fff', // Color of back button and title
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
      <Tabs.Screen
        name="resetmasterpassword"
        options={{
          headerStyle: {
            backgroundColor: '#6a5acd', // Background color for the header
          },
          headerTitle: 'Reset Master Password',
          headerTintColor: '#fff', // Color of back button and title
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
    </Tabs>
  );
};

export default Tabslayout;
