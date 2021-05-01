import React, {useEffect} from 'react';
import {StyleSheet, Image, View, Text, Button, TextInput} from 'react-native';
import {FAB} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as RNFS from 'react-native-fs';
import CryptoJS from 'react-native-crypto-js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {RSA} from 'react-native-rsa-native';
import {cond} from 'react-native-reanimated';

const Send = () => {
  const [previewImg, setPreviewImg] = React.useState(
    require('./../assets/647048.jpg'),
  );
  const [imageDetails, setImageDetails] = React.useState(null);
  const [receiverUserName, setReceiverUserName] = React.useState(null);
  const [receiverPublicKey, setReceiverPublicKey] = React.useState(null);
  const [encryptedPassword, setencryptedPassword] = React.useState(null);
  const [senderUserName, setSenderUserName] = React.useState(null);

  const launchGallery = () => {
    var options = {
      title: 'Select Image',
      allowsEditing: false,
      quality: 0.9,
      noData: true,
      maxWidth: 1200,
      maxHeight: 1200,
      mediaType: 'photo',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        cameraRoll: false,
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setImageDetails(response);
        setPreviewImg(source);
      }
    });
  };

  function randomstring(n) {
    let u = '';
    let alpha = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < n; i++) {
      let num = Math.random();
      num *= 1000;
      num = Math.ceil(num);
      num %= 36;
      u += alpha[num];
    }
    return u;
  }

  const RSAEncrypt = (text, public_key) => {
    const textToEncrypt = text;
    RSA.encrypt(textToEncrypt, public_key).then(encodedMessage => {
      return encodedMessage;
    });
  };

  return (
    <View style={styles.HomeScreenStyle}>
      <TextInput
        style={styles.StyleSheet}
        placeholder={"Eneter receiver's userName"}
        placeholderTextColor="#aaaaaa"
        value={receiverUserName}
        onChangeText={event => {
          setReceiverUserName(event);
        }}
      />
      <FAB
        style={styles.fab}
        smallr
        icon="send"
        onPress={() => {
          // console.log('size ->', imageDetails.fileSize);
          const imagePath = {
            uri: `file://${
              RNFS.DocumentDirectoryPath
            }/${new Date().toISOString()}.jpg`,
          };

          RNFS.read(previewImg.uri, imageDetails.fileSize, 0, 'base64')
            .then(res => {
              const resp = res;
              const myPassword = randomstring(20);
              let ciphertext = CryptoJS.AES.encrypt(
                resp,
                myPassword,
              ).toString();
              // RSAEncrypt(a) return encrypted string
              /*
                resp : encrypted image file as a string (added to database)


                this will be encrypted password (added to database)
                const s = RSAEncrypted(myPassword, reciversPublicKey)
                sender username , reciever username ,
                query : select * from userdetails where username === reciever name
              */

              const user = auth().currentUser;

              firestore()
                .collection('userDetails')
                .doc(user.uid)
                .get()
                .then(documentSnapshot => {
                  console.log('User exists: ', documentSnapshot.exists);

                  if (documentSnapshot.exists) {
                    setSenderUserName(documentSnapshot.data().userName);
                  }
                });

              firestore()
                .collection('userDetails')
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(documentSnapshot => {
                    if (
                      documentSnapshot &&
                      documentSnapshot.data().userName === receiverUserName
                    ) {
                      setReceiverPublicKey(documentSnapshot.data().publicKey);
                    }
                  });
                })
                .catch(error => {
                  console.log('error is  -->', error);
                });

              if (!(receiverPublicKey === null)) {
                RSA.encrypt(myPassword, receiverPublicKey).then(
                  encodedMessage => {
                    setencryptedPassword(encodedMessage);
                  },
                );

                if (
                  !(encryptedPassword === null) &&
                  !(senderUserName === null)
                ) {
                  firestore()
                    .collection('encryptedImages')
                    .add({
                      imageString: resp,
                      encryptedPassword: encryptedPassword,
                      senderuserName: senderUserName,
                      receiverUserName: receiverUserName,
                    })
                    .then(() => {
                      alert('sent succesfully');
                      setReceiverUserName(null);
                      setSenderUserName(null);
                    });
                }
              }

              // RSAEncrypt(myPassword, receiverPublicKey);
              // console.log(encryptedPassword);

              // console.log();
            })
            .catch(err => {
              console.log(err.message, err.code);
            });
        }}
      />
      <View style={styles.buttonStyle}>
        <Button
          title="clickme"
          color="#758283"
          onPress={() => {
            launchGallery();
          }}
        />
      </View>
      <Image style={styles.imageStyle} source={previewImg} />
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
  imageStyle: {
    height: 300,
    width: 300,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  selectbtn: {
    height: 500,
    width: 500,
    backgroundColor: '#303030',
  },
  buttonStyle: {
    width: '80%',
    borderRadius: 20,
    margin: 10,
  },
});

export default Send;
