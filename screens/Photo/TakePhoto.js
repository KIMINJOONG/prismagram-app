import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Camera } from "expo-camera";
import constants from "../../constants";
import Loader from "../../components/Loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { Platform } from "@unimodules/core";
import styles from "../../styles";
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.View``;

const Button = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 10px solid ${styles.lightGreyColor};
`;

export default ({ navigation }) => {
  const caemraRef = useRef();
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const takePhoto = async() => {
    if(!canTakePhoto) {
      return;
    }
    try {
      setCanTakePhoto(false);
      const { uri } = await caemraRef.takePictureAsync({
        quality: 1,
      });
      const asset = await MediaLibrary.createAssetAsync(uri);  
      navigation.navigate('Upload', {photo: asset});
    }catch(e) {
      console.log(e);
      setCanTakePhoto(true);
    }
    
    
  }

  const askPermission = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      if (status === "granted") {
        setHasPermission(true);
      }
    } catch (e) {
      console.log(e);
      setHasPermission(false);
    } finally {
      setLoading(false);
    }
  };
  const toggleType = () => {
    if(cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      {loading ? (
        <Loader />
      ) : hasPermission ? (
        <>
          <Camera
            ref={caemraRef}
            type={cameraType}
            style={{ 
              justifyContent: 'flex-end',
              padding: 15,
              width: constants.width, 
              height: constants.height / 2
            }}
          >

            <TouchableOpacity onPress={toggleType}>
              <View>
                <Ionicons name={Platform.OS === 'ios' ? 'ios-reverse-camera' : 'md-reverse-camera'} size={28} color={styles.blackColor} />
              </View>
            </TouchableOpacity>
          </Camera>
          <View>
            <TouchableOpacity onPress={takePhoto} disabled={!canTakePhoto}>
              <Button />
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </View>
  );
};