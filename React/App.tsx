// App.tsx
// Equivalent to Flutter's main.dart + MyApp

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import { RootStackParamList } from './src/navigation/types';
import HomeScreen from './src/features/users/ui/screens/HomeScreen';
import UsersScreen from './src/features/users/ui/screens/UsersScreen';
import UserDetailScreen from './src/features/users/ui/screens/UserDetailScreen';
import UserFormScreen from './src/features/users/ui/screens/UserFormScreen';

const appStartStopwatch = Date.now();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const elapsed = Date.now() - appStartStopwatch;

  console.log('========================');
  console.log('APP COLD START TIME');
  console.log(`TIME: ${elapsed} ms`);
  console.log('========================');

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'React Native Demo' }}
        />
        <Stack.Screen
          name="Users"
          component={UsersScreen}
          options={{ title: 'Users' }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={({ route }) => ({ title: route.params.user.name })}
        />
        <Stack.Screen
          name="UserForm"
          component={UserFormScreen}
          options={({ route }) => ({
            title: route.params?.user ? 'Editar User' : 'Crear User',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
