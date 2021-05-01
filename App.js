import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Login from './screens/Login';
import SignUp from './screens/Signup';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigator from './screens/TabNavigator';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          options={{
            title: 'Welcome',
            headerShown: false,
          }}
          component={Login}
        />
        <Stack.Screen
          name="SignUpScreen"
          options={{
            title: 'Welcome',
            headerShown: false,
          }}
          component={SignUp}
        />
        <Stack.Screen
          name="TabNavigator"
          options={{
            title: 'Crypt-Share',
            headerTitleAlign: 'center',
            headerTransparent: true,
            headerBackTitle: 'back',
            headerStyle: {
              backgroundColor: '#303030',
            },
            headerTintColor: 'cyan',
          }}
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#282828',
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageStyle: {
    height: 300,
    width: 300,
  },
  textStyle: {
    color: 'cyan',
    fontSize: 17,
  },
  buttonStyle: {
    width: 210,
    borderRadius: 20,
    margin: 10,
  },
  textInputStyle: {
    margin: 9,
    color: 'white',
    height: 43,
    borderColor: 'cyan',
    paddingLeft: 20,
    width: 300,
    borderWidth: 1,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
