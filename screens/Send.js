import React from 'react';
import {StyleSheet,Image , View, Text, Button} from 'react-native';
import { FAB } from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 



const Send = () => {

  const [previewImg , setPreviewImg] = React.useState(require('./../assets/647048.jpg'));
  

  const launchGallery = ()=>{
    var options = {
      title: 'Select Image',
      allowsEditing: false,
      quality:0.9,
      noData: true,
      maxWidth:1200,
      maxHeight:1200,
      mediaType: "photo",
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
          skipBackup: true,
          cameraRoll: false
      },
    };
    launchImageLibrary(options,response => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = { uri: response.uri };
          console.log(response)
          setPreviewImg(source)
        }
      }
    )
  }

  return (
    <View style={styles.HomeScreenStyle}>
      <FAB
        style={styles.fab}
        small
        icon="send"
        onPress={() => console.log('Pressed')}
      />
        <View style={styles.buttonStyle}>
          <Button
            title="clickme"
            color="#758283"
            onPress={() => {
              launchGallery()
            }}
          />
        </View>
        <Image 
          style={styles.imageStyle}
          source={previewImg} />
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
    backgroundColor:'#303030'
  },
  buttonStyle: {
    width:'80%',
    borderRadius: 20,
    margin: 10,
  }
});

export default Send;