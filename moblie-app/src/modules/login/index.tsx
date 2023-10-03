import Wrapper from "@/shared/components/wrapper";
import Typography from "@/shared/components/Typography";
import { LogoApp } from "@/shared/assets/images";
import { ActivityIndicator, Alert, Image, View } from "react-native";
import Input from "@/shared/components/input";
import { normalize } from "@/shared/helpers";
import checkIcon from './check.png'
import Button from "@/shared/components/buttons/normal";
import React, { useState } from "react";
import useDarkMode from "@/shared/hooks/useDarkMode";
import { NavigationProp } from "@react-navigation/native";
import CheckBox from "@/shared/components/checkbox";
import { userLoginUrl } from "@/apis";
import { storeData } from "@/apis/storageToken";

type RootStackParamList = {
  forgotPassword: undefined;
  register: undefined
  home: undefined
};
type User = {
  email: string
  password: string
}
interface LoginProps {
  navigation: NavigationProp<RootStackParamList, 'forgotPassword' | 'register' | 'home'>;
}
export default function Login({ navigation }) {
  const { isDarkMode } = useDarkMode();
  const [user, setUser] = useState<User>({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChangeInput = (key: string, value: string | number | boolean) => {
    setUser({
      ...user,
      [key]: value,
    });
  }

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();
    const newUser = {
      email: user.email,
      password: user.password,
    }
    setLoading(true);
    const response = await (await fetch(userLoginUrl, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();

    console.log(response);
    if (response.success) {
      Alert.alert('Login successfully')
      storeData(response.token,response.user);
      navigation.replace('home')
    } else {
      Alert.alert('Invalid email and password')
    }
    setLoading(false);

  }

  function goToForgotPassword() {
    navigation.navigate('forgotPassword')
  }
  function goToRegister() {
    navigation.navigate('register')
  }
  function goToHome() {
    navigation.navigate('home')
  }
  return (
    <Wrapper>
      <View style={{ paddingHorizontal: normalize(24), flex: 1 }}>
        <View style={{ flex: 0.5, justifyContent: 'center' }}>
          <Image style={{ width: '100%', height: 80, tintColor: isDarkMode ? 'white' : 'black' }} resizeMode="contain" source={LogoApp} />
        </View>
        <View style={{ flex: 1 }}>
          <Input value={user.email} onChange={(e:any)=>handleChangeInput('email',e)} label="Email" placeholder="Joendoe@gmail.com" />
          <View style={{ marginVertical: normalize(8) }} />
          <Input secureTextEntry onChange={(e:any)=>handleChangeInput('password',e)} value={user.password} label="Password" placeholder="********" />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: normalize(16) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* <CheckBox />
                  <Typography customStyle={{opacity: 0.5, marginLeft: normalize(5)}} value="Remember me" /> */}
            </View>
            <Typography onPress={goToForgotPassword} customStyle={{ opacity: 0.5 }} value="Forgot password?" />
          </View>
        </View>

        <View style={{ marginTop: normalize(32), flex: 1, marginBottom: normalize(10), justifyContent: 'flex-end' }}>
          
          {
            loading ?
            <ActivityIndicator size="large" color="#00ff00" />
            :
            <Button onPress={handleLoginSubmit} title="Sign in" />

          }
          <View style={{ marginVertical: normalize(8) }} />
          <Button onPress={goToRegister} isPrimary={false} title="Create account" />
        </View>
      </View>
    </Wrapper>
  )
}
