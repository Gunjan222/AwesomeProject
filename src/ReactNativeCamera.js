import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';

// import OutlinedButton from '../components/UI/OutlinedButton';

export default function Camera({route}) {
  const [{cameraRef}, {takePicture}] = useCamera(null);
  const [fileData, setFileData] = useState('');

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      console.log('data', data.uri);
      const filePath = data.uri;
      const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.jpg';
      RNFS.moveFile(filePath, newFilePath)
        .then(() =>
          console.log('moveFile', `from ${filePath} moved to ${newFilePath}`),
        )
        .catch(e => console.log('error inside try', e));
    } catch (e) {
      console.log('error', e);
    }
  };

  // const takePicture = async () => {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options);
  //     console.log(data.uri);
  //   }
  // };

  return (
    <View style={styles.body}>
      <RNCamera
        style={styles.preview}
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}>
        {/* <OutlinedButton icon="camera" onPress={() => captureHandle()}>
          Capture
        </OutlinedButton> */}
      </RNCamera>
      <Button title="camera" onPress={() => captureHandle()} />
      {fileData && (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}
        />
      )}
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          // onPress={this.takePicture.bind(this)}
          style={styles.capture}>
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
