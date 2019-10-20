import React, {useState }from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({navigation}) => {
  const confirmInput = useInput('');
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: confirmInput.value,
      email: navigation.getParam('email')
    }
  });
  const handleConfirm = async() => {
    const { value } = confirmInput;
    if(value === '' || !value.includes(" ")) {
      return Alert.alert('잘못된 비밀번호입니다.');
    }
    try {
      setLoading(true);
      const { 
        data: {
          confirmSecret
        }
      } = await confirmSecretMutation();
      if(confirmSecret !== '' || confirmSecret !== false) {
        logIn(confirmSecret);
      } else {
        Alert.alert('잘못된 비밀번호입니다.');
      }
    }catch(e) {
      Alert.alert('확인 실패');
    }finally {
      setLoading(false);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput 
          {...confirmInput} 
          placeholder="Email" 
          returnKeyType='send'
          onSubmitEditing={handleConfirm}
          autoCorrect={false}
          />
        <AuthButton 
          loading={loading}
          onPress={handleConfirm} 
          text="Confirm" 
        />
      </View>
    </TouchableWithoutFeedback>
    
  )
}