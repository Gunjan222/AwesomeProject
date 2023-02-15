import {View, Text, Button, Image} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const ReactNativeImagePicker = () => {
  const [file, setFileData] = useState('');
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launch1Camera();
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const launch1Camera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = {uri: response.uri};
        let newForm = new FormData();
        newForm.append('file', response.assets);
        console.log({
          filePath: response,
          fileData: response,
          fileUri: response.assets[0].uri,
        });

        setFileData({
          filePath: response,
          fileData: response,
          fileUri: response.assets[0].uri,
        });
        console.log('image source', response.assets[0].uri);
      }
    });
  };

  function RenderFileData() {
    if (file.fileData) {
      return (
        <View style={{borderColor: 'red', borderWidth: 1}}>
          <Image
            source={{uri: `data:image/jpeg;base64,${file.fileData}`}}
            style={{height: 100, width: 100}}
          />
        </View>
      );
    } else {
      return <Text>ReactNativeImaitrurwgfhsdjgfsdhfggePicker</Text>;
    }
  }

  function RenderFileUri() {
    if (file.fileUri) {
      return (
        <View
          style={{
            borderColor: 'red',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: file.fileUri}}
            style={{height: 200, width: 200}}
          />
        </View>
      );
    } else {
      return <Text>ReactNativeImaitrurwgfhsdjgfsdhfggePicker</Text>;
    }
  }

  return (
    <View>
      <Text>ReactNativeImagePicker</Text>
      <Button title="Launch" onPress={() => requestCameraPermission()} />
      <View>
        {RenderFileData()}
        <Text style={{textAlign: 'center'}}>Base 64 String</Text>
      </View>
      <View>
        {RenderFileUri()}
        <Text style={{textAlign: 'center'}}>File Uri</Text>
      </View>
    </View>
  );
};

export default ReactNativeImagePicker;
