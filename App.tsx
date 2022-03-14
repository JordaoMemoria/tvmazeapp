import React, {useEffect, useState} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import styles from './src/common/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LogBox, View} from 'react-native';

import WatchScreen from './src/screens/WatchScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import SerieScreen from './src/screens/SerieScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import EpisodeScreen from './src/screens/EpisodeScreen';
import PersonScreen from './src/screens/PersonScreen';
import PasswordScreen from './src/screens/PasswordScreen';

import store from './src/redux/app/store';
import {Provider} from 'react-redux';
import LoadingScreen from './src/screens/LoadingScreen';
import {load} from './src/db/storage';
import PINCodeCustom from './src/components/PINCodeCustom';

const Tab = createBottomTabNavigator();
const WatchStack = createNativeStackNavigator();
const FavoriteStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const WhiteTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: styles.colors.background,
  },
};

const WatchStackScreen = () => {
  return (
    <WatchStack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: styles.colors.secondary,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: styles.colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: styles.fonts.big,
        },
      })}>
      <WatchStack.Screen
        name="Watch"
        component={WatchScreen}
        options={{
          title: 'TV Maze',
        }}
      />
      <WatchStack.Screen
        name="Serie"
        component={SerieScreen}
        options={{
          title: 'Details',
        }}
      />
      <WatchStack.Screen
        name="Episode"
        component={EpisodeScreen}
        options={{
          title: 'Episode',
        }}
      />
      <WatchStack.Screen
        name="Person"
        component={PersonScreen}
        options={{
          title: 'Details',
        }}
      />
    </WatchStack.Navigator>
  );
};

const FavoriteStackScreen = () => {
  return (
    <FavoriteStack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: styles.colors.secondary,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: styles.colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: styles.fonts.big,
        },
      })}>
      <FavoriteStack.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          title: 'Favorites',
        }}
      />
      <WatchStack.Screen
        name="SerieF"
        component={SerieScreen}
        options={{
          title: 'Details',
        }}
      />
      <WatchStack.Screen
        name="EpisodeF"
        component={EpisodeScreen}
        options={{
          title: 'Episode',
        }}
      />
      <WatchStack.Screen
        name="PersonF"
        component={PersonScreen}
        options={{
          title: 'Details',
        }}
      />

      <WatchStack.Screen name="Serie" component={SerieScreen} />
    </FavoriteStack.Navigator>
  );
};

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: styles.colors.secondary,
        },
        headerBackTitleVisible: false,
        headerTitleAlign: 'center',
        headerTintColor: styles.colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: styles.fonts.big,
        },
      })}>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
      <SettingsStack.Screen name="Pincode" component={PasswordScreen} />
    </SettingsStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer theme={WhiteTheme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName: any = '';
            switch (route.name) {
              case 'WatchTab':
                iconName = focused ? 'tv' : 'tv-outline';
                break;
              case 'FavoritesTab':
                iconName = focused ? 'heart' : 'heart-outline';
                break;
              case 'SettingsTab':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: styles.colors.primary,
          tabBarInactiveTintColor: styles.colors.background,
          tabBarShowLabel: false,
          tabBarStyle: {backgroundColor: 'black'},
        })}>
        <Tab.Screen name="WatchTab" component={WatchStackScreen} />
        <Tab.Screen name="FavoritesTab" component={FavoriteStackScreen} />
        <Tab.Screen name="SettingsTab" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function () {
  LogBox.ignoreLogs(['RCTBridge']);

  const [loadingPincode, setLoadingPincode] = useState(true);
  const [enterPincode, setEnterPincode] = useState(true);
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    load('auth_config', (data: any) => {
      data.pincode === '' ? setEnterPincode(false) : setPincode(data.pincode);
      setLoadingPincode(false);
    });
  }, []);

  if (loadingPincode) {
    return (
      <NavigationContainer>
        <LoadingScreen />
      </NavigationContainer>
    );
  } else if (enterPincode) {
    return (
      <NavigationContainer>
        <PINCodeCustom
          mode="enter"
          pincode={pincode}
          onFinish={() => {
            setEnterPincode(false);
          }}
        />
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
