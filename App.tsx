import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider, useAuth } from './src/context/Authcontext';
import { PetProvider } from './src/context/PetContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import PetListScreen from './src/screens/PetListScreen';
import PetDetailScreen from './src/screens/PetDetailScreen';
import SavedPetsScreen from './src/screens/SavedPetsScreen';
import LoginScreen from './src/screens/admin/LoginScreen';
import AdminDashboard from './src/screens/admin/AdminDashboard';
import ManagePetsScreen from './src/screens/admin/ManagePetsScreen';
import PetFormScreen from './src/screens/admin/PetFormScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Browse') {
          iconName = focused ? 'paw' : 'paw-outline';
        } else if (route.name === 'Saved') {
          iconName = focused ? 'heart' : 'heart-outline';
        } else {
          iconName = 'help';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF7D40',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Browse" component={PetListScreen} />
    <Tab.Screen name="Saved" component={SavedPetsScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Authenticated admin flow
          <>
            <Stack.Screen 
              name="AdminDashboard" 
              component={AdminDashboard} 
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ManagePets" component={ManagePetsScreen} />
            <Stack.Screen name="PetForm" component={PetFormScreen} />
          </>
        ) : (
          // Public flow
          <>
            <Stack.Screen 
              name="Welcome" 
              component={WelcomeScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="UserTabs" 
              component={UserTabs} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="PetDetail" 
              component={PetDetailScreen} 
              options={{ title: 'Pet Details' }}
            />
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PetProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </PetProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}