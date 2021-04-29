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

const SignUp = ({navigation}) => {
  const [emailText, setEmailText] = React.useState(null);
  const [passwordText, setPasswordText] = React.useState(null);
  const [confirmPasswordText, setConfirmPasswordText] = React.useState(null);
  const [userName, setUserName] = React.useState(null);

  const handleSignUp = () => {
    setEmailText(null);
    setPasswordText(null);
    setConfirmPasswordText(null);
    setUserName(null);
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={styles.viewContainer}>
        <Image
          style={styles.imageStyle}
          source={require('./../assets/Crypt-share.gif')}></Image>

        <TextInput
          value={userName}
          style={styles.textInputStyle}
          onChangeText={event => {
            setUserName(event);
          }}
          placeholder="Username..."
          placeholderTextColor="#aaaaaa"
        />
        <TextInput
          value={emailText}
          style={styles.textInputStyle}
          onChangeText={event => {
            setEmailText(event);
          }}
          placeholder="Email..."
          placeholderTextColor="#aaaaaa"
        />
        <TextInput
          value={passwordText}
          style={styles.textInputStyle}
          onChangeText={event => {
            setPasswordText(event);
          }}
          secureTextEntry={true}
          ref={ref =>
            ref && ref.setNativeProps({style: {fontFamily: 'robot-regular'}})
          }
          placeholder="Password..."
          placeholderTextColor="#aaaaaa"
        />
        <TextInput
          value={confirmPasswordText}
          style={styles.textInputStyle}
          onChangeText={event => {
            setConfirmPasswordText(event);
          }}
          secureTextEntry={true}
          ref={ref =>
            ref && ref.setNativeProps({style: {fontFamily: 'robot-regular'}})
          }
          placeholder="ConfirmPassword..."
          placeholderTextColor="#aaaaaa"
        />
        <View style={styles.buttonStyle}>
          <Button
            title="Sign Up"
            color="#758283"
            onPress={() => {
              handleSignUp();
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setEmailText(null);
            setPasswordText(null);
            setConfirmPasswordText(null);
            setUserName(null);
            navigation.navigate('LoginScreen');
          }}>
          <View
            style={{
              padding: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'cyan', fontSize: 12}}>
              Already have a account?
            </Text>
            <Text style={{color: 'cyan', fontSize: 12}}>Click to Sign In</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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

export default SignUp;
