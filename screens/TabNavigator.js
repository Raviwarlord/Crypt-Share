import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Send from './Send';
import Receive from './Receive';
import Home from './Home';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={Home}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            // console.log("vishal")
            iconName = 'home';
          } else if (route.name === 'SendScreen') {
            iconName = 'share';
          } else if (route.name === 'ReceiveScreen') {
            iconName = 'cloud-download';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0abde3',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#303030',
        },
      }}>
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
