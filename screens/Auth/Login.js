import React, {useState }from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({navigation}) => {
  const emailInput = useInput('');
  const [loading, setLoading] = useState(false);
  const requestSecret = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value
    }
  })
  const handleLogin = async() => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(value === '') {
      return Alert.alert('이메일을 입력해주세요.');
    } else if(!value.includes('@') || !value.includes('.')) {
      return Alert.alert('올바른 이메일 형식을 입력해주세요');
    } else if(!emailRegex.test(value)) {
      return Alert.alert('해당 이메일은 유효하지않습니다.');
    }

    try {
      setLoading(true);
      await requestSecret();
      Alert.alert('비밀번호를 이메일로 보냈습니다.');
      navigation.navigate('Confirm');
    }catch(e) {
      Alert.alert('지금 로그인을 할 수 없습니다.');
    }finally {
      setLoading(false);
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
          loading={loading}
          onPress={handleLogin} 
          text="Log In" 
        />
      </View>
    </TouchableWithoutFeedback>
    
  )
}