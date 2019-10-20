import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default () => {
  const emailInput = useInput('');
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const handleLogin = () => {
    const { value } = emailInput;
    if(value === '') {
      return Alert.alert('이메일을 입력해주세요.');
    } else if(!value.includes('@') || !value.includes('.')) {
      return Alert.alert('올바른 이메일 형식을 입력해주세요');
    } else if(!emailRegex.test(value)) {
      return Alert.alert('해당 이메일은 유효하지않습니다.');
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput 
          {...emailInput} 
          placeholder="Email" 
          keyboardType="email-address" 
          returnKeyType='send'
          onEndEditing={handleLogin}
          autoCorrect={false}
          />
        <AuthButton 
          onPress={handleLogin} 
          text="Log In" 
        />
      </View>
    </TouchableWithoutFeedback>
    
  )
}