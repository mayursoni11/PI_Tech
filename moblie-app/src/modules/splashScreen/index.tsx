import { Image, SafeAreaView } from "react-native";
import { LogoApp } from "@/shared/assets/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";


export default function SplashScreen({navigation}) {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
       navigation.replace('home')
      }else{
       navigation.replace('onboarding')
      }
    } catch (e) {
    }
  };
  useEffect(()=>{
    getData();
  })
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <Image style={{ width: '100%', height: 80 }} resizeMode="contain" source={LogoApp} />
    </SafeAreaView>
  )
}
