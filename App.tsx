import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './context/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import PetListScreen from './screens/PetListScreen';
import PetDetailScreen from './screens/PetDetailScreen';
import SavedPetsScreen from './screens/SavedPetsScreen';
import ApplicationFormScreen from './screens/ApplicationFormScreen';
import LoginScreen from './screens/admin/LoginScreen';
import AdminDashboard from './screens/admin/AdminDashboard';
import ManagePetsScreen from './screens/admin/ManagePetsScreen';
import PetFormScreen from './screens/admin/PetFormScreen';
import ApplicationsScreen from './screens/admin/ApplicationsScreen';
import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const UserTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Browse') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'Saved') {
            iconName = focused ? 'heart' : 'heart-outline';
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
};

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen 
              name="AdminDashboard" 
              component={AdminDashboard} 
              options={{ headerShown: false }}
            />
            <Stack.Screen name="ManagePets" component={ManagePetsScreen} />
            <Stack.Screen name="PetForm" component={PetFormScreen} />
            <Stack.Screen name="Applications" component={ApplicationsScreen} />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="UserTabs" 
              component={UserTabs} 
              options={{ headerShown: false }}
            />
            <Stack.Screen name="PetDetail" component={PetDetailScreen} />
            <Stack.Screen name="ApplicationForm" component={ApplicationFormScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
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
        <StatusBar style="auto" />
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}