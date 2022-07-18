import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/mainScreens/SearchScreen';
import SingleProductScreeen from '../screens/productScreen/SingleProductScreen';
import CustomBottomTabs from './CustomBottomTabs';
const Stack = createStackNavigator();

const SearchScreenStack = ({ openSheet }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false, animationEnabled: true }}
        name="Search"
        // component={CustomBottomTabs}
      >
        {props => <CustomBottomTabs {...props} openSheet={openSheet} />}
      </Stack.Screen>
      <Stack.Screen name="Single" component={SingleProductScreeen} />
    </Stack.Navigator>
  );
};

export default SearchScreenStack;
