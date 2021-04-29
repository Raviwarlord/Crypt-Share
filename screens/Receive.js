import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Receive = () => {
  return (
    <View style={styles.HomeScreenStyle}>
      <Text style={styles.textStyle}>This is the Receive Screen</Text>
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

export default Receive;
