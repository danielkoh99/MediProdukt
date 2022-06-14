import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/mainScreens/Home';
import { getHeaderTitle } from '@react-navigation/elements';
import { useApp, useUser } from '@realm/react';
import createAlert from '../helpers/Dialog';
import DynamicFilter from '../components/DynamicFilter';
import countryData from '../data/eea-member-countries.json';
import SearchScreen from '../screens/mainScreens/SearchScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SettingsScreen from '../screens/mainScreens/Settings';

const CustomCenterButton = ({ children, onPress }) => (
  <Pressable
    style={{
      top: -25,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      width: 70,
      height: 70,
      ...styles.shadow,
    }}
    onPress={onPress}>
    <View
      style={{
        borderRadius: 35,
        padding: 10,
        height: 70,
        width: 70,
        backgroundColor: 'white',
      }}>
      {children}
    </View>
  </Pressable>
);
const Tab = createBottomTabNavigator();

export default function CustomBottomTabs({ openSheet }) {
  const user = useUser();
  const app = useApp();
  const logoutAlertItems = [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'Log out', onPress: () => user.logOut() },
  ];
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => {
          return (
            <View style={{ marginRight: 20 }}>
              <Pressable>
                <TouchableOpacity>
                  <Icon
                    backgroundColor={'transparent'}
                    color={'black'}
                    size={25}
                    onPress={() =>
                      createAlert(
                        'Are you sure you want to log out?',
                        '',
                        logoutAlertItems,
                      )
                    }
                    name="logout"
                  />
                </TouchableOpacity>
              </Pressable>
            </View>
          );
        },
        headerStyle: {
          backgroundColor: '#63D3B6',
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}>
              <Icon
                backgroundColor={'white'}
                // onPress={()=>}
                color={focused ? 'blue' : 'green'}
                name="house"
                size={focused ? 30 : 25}
              />
              <Text
                style={{
                  color: focused ? 'blue' : 'green',
                  fontSize: focused ? 15 : 12,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Search product"
        component={SearchScreen}
        // component={SearchScreenStack}
        options={{
          // headerTitle: '',
          headerLeft: () => {
            return (
              <Pressable>
                <TouchableOpacity>
                  <View style={{ marginLeft: 20 }}>
                    <Icon
                      backgroundColor={'transparent'}
                      color={'black'}
                      size={25}
                      onPress={() => openSheet(0)}
                      name="sort"
                    />
                  </View>
                </TouchableOpacity>
              </Pressable>
            );
          },
          tabBarIcon: ({ focused }) => (
            <Icon color={focused ? 'blue' : 'green'} name="search" size={40} />
          ),
          tabBarButton: props => <CustomCenterButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
              }}>
              <Icon
                backgroundColor={'white'}
                color={focused ? 'blue' : 'green'}
                name="settings"
                size={focused ? 30 : 25}
              />
              <Text
                style={{
                  color: focused ? 'blue' : 'green',
                  fontSize: focused ? 15 : 12,
                }}>
                settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#63D3B6',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 1,
  },
  icon: {},
});
