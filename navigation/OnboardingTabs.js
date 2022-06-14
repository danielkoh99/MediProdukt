import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OBScreenOne from '../screens/onboardingScreens/OBScreenOne';
import OBScreenTwo from '../screens/onboardingScreens/OBScreenTwo';

const Tab = createMaterialTopTabNavigator();

const OnboardingTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false, tabBarShowIcon: false }}>
      <Tab.Screen name="ScreenOne" component={OBScreenOne} />
      <Tab.Screen name="ScreenTwo" component={OBScreenTwo} />
    </Tab.Navigator>
  );
};
export default OnboardingTabs;
