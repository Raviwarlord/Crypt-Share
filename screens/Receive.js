import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Receive = () => {
  function RSADecrypt(text, private_key) {
    //here we will recieve public key to encrypt our cipher from firebase
    const textToDecrypt = text;
    let decryptedText;
    RSA.decrypt(text, private_key).then(decryptedMessage => {
      decryptedText = decryptedMessage;
    });
    return decryptedText;
  }

  /* 
  ` -----------------decript function---------------
  select * from userDetails where username == currentusername
  
  here we will get RSAEncryptedPassword and encryptedImageFile

  orignalPassword = RSADecrypt(RSAEncryptedPassword,private_key)

  let bytes = CryptoJS.AES.decrypt(ciphertext,orignalPassword );
  let originalText = bytes.toString(CryptoJS.enc.Utf8);


  // console.log(originalText); 
  console.log(typeof resp)
  RNFS.write(imagePath.uri, originalText, 0, "base64")
  console.log("Image path -> ", imagePath)
  setPreviewImg(imagePath)

*/

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
