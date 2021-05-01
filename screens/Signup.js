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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {RSA} from 'react-native-rsa-native';

const SignUp = ({navigation}) => {
  const [emailText, setEmailText] = React.useState(null);
  const [passwordText, setPasswordText] = React.useState(null);
  const [confirmPasswordText, setConfirmPasswordText] = React.useState(null);
  const [userName, setUserName] = React.useState(null);

  const handleSignUp = async () => {
    if (passwordText === confirmPasswordText) {
      const response = await auth()
        .createUserWithEmailAndPassword(emailText, passwordText)
        .catch(error => {
          alert(error);
        });

      if (response !== undefined) {
        // generating private and public keys
        const keys = await RSA.generateKeys(2048);
        let private_key = keys.private.toString();
        let public_key = keys.public.toString();

        // adding user to firestore database
        const user = auth().currentUser;
        console.log(user);
        firestore()
          .collection('userDetails')
          .doc(user.uid)
          .set({
            userName: userName,
            email: emailText,
            password: passwordText,
            publicKey: public_key,
            privateKey: private_key,
          })
          .then(console.log(user.uid))
          .catch(error => {
            console.log(error);
          });

        // cleanup and navigation
        setEmailText(null);
        setPasswordText(null);
        setConfirmPasswordText(null);
        setUserName(null);
        navigation.navigate('TabNavigator');
      }
    } else {
      alert('Passwords Do no match');
    }
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
