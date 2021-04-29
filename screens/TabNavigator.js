import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Send from './Send';
import Receive from './Receive';
import Home from './Home';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName={Home}>
      <Tab.Screen name="HomeScreen" component={Home} />
      <Tab.Screen name="SendScreen" component={Send} />
      <Tab.Screen name="ReceiveScreen" component={Receive} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  HomeScreenStyle: {
    flex: 1,
    backgroundColor: '#303030',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'cyan',
    fontWeight: 'bold',
  },
});

export default TabNavigator;
