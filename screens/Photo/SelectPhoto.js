import React, {useState, useEffect} from "react";
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import styled from "styled-components";
import Loader from "../../components/Loader";
import { Image } from 'react-native';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const [loading, setLoading ] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [selected, setSelected] = useState();
  const [allPhotos, setAllPhotos] = useState();
  const getPhotos = async() => {
    try {
      const {assets} = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      setSelected(firstPhoto);
      setAllPhotos(assets);
    }catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }
  const askPermission = async() => {
    try {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if(status === 'granted'){
        setHasPermission(true);
        getPhotos();
      }
    }catch(error) {
      console.log(error);
      setHasPermission(false);
    }
    
  }
  useEffect(() => {
    askPermission();
  }, []);
  return (
    <View>
      {
        loading ? <Loader /> : (
          <View>
            <Text>{hasPermission ? (
              <Image style={{width: 100, height: 100}} source={{ uri: selected.uri}} />
            ) : null}</Text>
          </View>
        )
      }
    </View>
  );
};