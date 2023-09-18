import Wrapper from "@/shared/components/wrapper";
import Typography from "@/shared/components/Typography";
import { LogoApp } from "@/shared/assets/images";
import { Image, View } from "react-native";
import Input from "@/shared/components/input";
import { normalize } from "@/shared/helpers";
import checkIcon from './check.png'
import Button from "@/shared/components/buttons/normal";
import React from "react";
import useDarkMode from "@/shared/hooks/useDarkMode";
import { NavigationProp } from "@react-navigation/native";
import CheckBox from "@/shared/components/checkbox";

type RootStackParamList = {
  forgotPassword: undefined;
  register: undefined
  home: undefined
};
interface LoginProps {
  navigation:  NavigationProp<RootStackParamList, 'forgotPassword' | 'register' | 'home'>;
}
export default function Login({navigation}: LoginProps) {
  const {isDarkMode} = useDarkMode();
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
        <View style={{paddingHorizontal: normalize(24), flex: 1}}>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <Image style={{width: '100%', height: 80, tintColor: isDarkMode ? 'white' : 'black'}} resizeMode="contain" source={LogoApp} />
            </View>
            <View style={{flex: 1}}>
              <Input value="" label="Username" placeholder="Joen Doe" />
              <View style={{marginVertical: normalize(8)}} />
              <Input secureTextEntry value="" label="Password" placeholder="********" />
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: normalize(16)}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                 <CheckBox />
                  <Typography customStyle={{opacity: 0.5, marginLeft: normalize(5)}} value="Remember me" />
                </View>
                <Typography onPress={goToForgotPassword} customStyle={{opacity: 0.5}} value="Forgot password?" />
              </View>
            </View>

            <View style={{marginTop: normalize(32), flex: 1, marginBottom: normalize(10), justifyContent: 'flex-end'}}>
              <Button onPress={goToHome} title="Sign in" />
              <View style={{marginVertical: normalize(8)}} />
              <Button onPress={goToRegister} isPrimary={false} title="Create account" />
            </View>
        </View>
    </Wrapper>
  )
}
