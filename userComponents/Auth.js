import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AuthScreen from '../screens/authScreens/AuthScreen';

export default function Auth() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <StatusBar barStyle={'light-content'} />
        <SafeAreaView
          edges={['right', 'left', 'top']}
          style={{ flex: 1, backgroundColor: 'black' }}>
          <Tab.Navigator>
            <Tab.Screen name="Sign up" options={{ tabBarLabel: 'Sign up' }}>
              {() => <AuthScreen title={'Sign up'} keyName={'signup'} />}
            </Tab.Screen>
            <Tab.Screen name="Login" options={{ tabBarLabel: 'Login' }}>
              {() => <AuthScreen title={'Login'} keyName={'login'} />}
            </Tab.Screen>
          </Tab.Navigator>
          <FlashMessage position="top" />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
