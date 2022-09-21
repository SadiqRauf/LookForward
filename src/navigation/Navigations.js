import React from 'react';
import {Colors} from '../config/Colors';
import FindingScreen from '../screens/finding';
import ProfileScreen from '../screens/profile';
import CountdownScreen from '../screens/countdown';
import OnboardingScreen from '../screens/onboarding';
import MovieDetails from '../screens/details/MovieDetails';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import ActorDetail from '../screens/details/ActorDetail';
import TrackTv from '../screens/trackTv/TrackTv';
import DetailsTv from '../screens/trackTv/DetailsTv';
import SeasonsScreen from '../screens/trackTv/SeasonsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Find"
      screenOptions={{
        activeTintColor: Colors.appColor,
        inactiveTintColor: Colors.grey,
        activeBackgroundColor: Colors.backgroundColor,
        inactiveBackgroundColor: Colors.backgroundColor,
        tabBarStyle: {
          backgroundColor: Colors.backgroundColor,
          borderTopColor: Colors.backgroundColor,
        },
      }}>
      <Tab.Screen
        name="Find"
        component={FindingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesome name="search" size={25} color={Colors.appColor} />
            ) : (
              <FontAwesome name="search" size={25} color={Colors.grey} />
            ),
        }}
      />
      <Tab.Screen
        name="Countdown"
        component={CountdownScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="history"
                size={30}
                color={Colors.appColor}
              />
            ) : (
              <MaterialCommunityIcons
                name="history"
                size={30}
                color={Colors.grey}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={TrackTv}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesome name="tv" size={25} color={Colors.appColor} />
            ) : (
              <FontAwesome name="tv" size={25} color={Colors.grey} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesome
                name="user-circle-o"
                size={25}
                color={Colors.appColor}
              />
            ) : (
              <FontAwesome name="user-circle-o" size={25} color={Colors.grey} />
            ),
        }}
      />

      <Tab.Screen // todo
        name="MovieDetails"
        component={MovieDetails}
        options={{
          headerShown: false,
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  return (
    <Stack.Navigator initialRouteName="OnboardingScreen">
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ActorDetail"
        component={ActorDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsTv"
        component={DetailsTv}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SeasonsScreen"
        component={SeasonsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
