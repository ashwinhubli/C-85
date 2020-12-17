import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSideBarMenu  from './CustomSideBarMenu';

export const AppDrawerNavigator = createDrawerNavigator({
    Home : {
    screen : AppTabNavigator
    },
    MyDonation:{
    screen: MyDonationScreen
    },
    Notifications:{
      screen: NotificationScreen
    },

  Setting:{
    screen: SettingsScreen
  },
  
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })
