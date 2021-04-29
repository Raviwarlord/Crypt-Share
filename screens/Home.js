import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';

const Home = () => {
  return (
    <View style={styles.HomeScreenStyle}>
      <Text style={styles.textStyle}>This is the Home Screen</Text>
    </View>
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

export default Home;
