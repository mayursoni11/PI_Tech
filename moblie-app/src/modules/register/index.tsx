import Wrapper from "@/shared/components/wrapper";
import Typography from "@/shared/components/Typography";
import { ActivityIndicator, Alert, Image, Text, View } from "react-native";
import BackBtn from "@/shared/components/backBtn";
import { normalize } from "@/shared/helpers";
import TitleScreen from "@/shared/components/title";
import Input from "@/shared/components/input";
import Button from "@/shared/components/buttons/normal";
import CheckBox from "@/shared/components/checkbox";
import { NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import { registerUrl } from "@/apis";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AddBlue } from "@/shared/assets/icons";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useRef } from "react";
import color from "@/shared/constans/colors";

type RootStackParamList = {
  confirmEmail: undefined;
};
interface RegisterProps {
  navigation: NavigationProp<RootStackParamList, 'confirmEmail'>;
}

type User = {
  firstName: string
  lastName: string
  // username: string
  // phoneNumber: number
  email: string
  password: string
  agree: boolean
}
export default function Register({ navigation }: RegisterProps) {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    // username: '',
    // phoneNumber: 0,
    email: '',
    password: '',
    agree: false
  });

  const [setSelectImage, setSetSelectImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [setSelectImageBase64, setSetSelectImageBase64] = useState('')

  const handleChangeInput = (key: string, value: string | number | boolean) => {
    setUser({
      ...user,
      [key]: value,
    });
  }

  const uploadProfileImage = () => {
    const options = {
      // storageOptions: {
      //   path: 'image',
      //   includeBase64: true
      // },
      mediaType: 'photo',
      includeBase64: true
    }
    launchImageLibrary(options, response => {

      setSetSelectImageBase64(response.assets[0].base64)
      setSetSelectImage(response.assets[0].uri)
    });
  }


  const handleRegisterSubmit = async (e: any) => {
    e.preventDefault();
    const convert_to_array = setSelectImageBase64?.split(' ');
    const newUser = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      password: user.password,
      avatar: `data:image/jpeg;base64,${setSelectImageBase64}`
    }
    setLoading(true);
    const response = await (await fetch(registerUrl, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();

    if (response.success) {
      Alert.alert(response.message)
      navigation.navigate('confirmEmail')
    } else {
      Alert.alert(response.message)
    }
    setLoading(false);

  }

  function goToConfirmEmail() {
    navigation.navigate('confirmEmail')
  }
  return (
    <Wrapper>
      <View style={{ flex: 1, paddingHorizontal: normalize(24), marginTop: normalize(20) }}>
        <BackBtn />
        <View style={{ marginVertical: normalize(24) }}>
          <TitleScreen value="Let’s create your account" />
        </View>
        <TouchableOpacity style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10
        }} onPress={uploadProfileImage} >
          <Image
            style={{
              borderRadius: 150,
              backgroundColor: color.neutral.darkGray,
              width: normalize(60),
              height: normalize(60)
            }}
            source={{ uri: setSelectImage == '' ? 'https://i.ibb.co/Y70KDJ8/Avatar-12.png' : setSelectImage }}
          />
        </TouchableOpacity>
        {/* <View style={{ marginVertical: normalize(24) }}>
          <TouchableOpacity onPress={uploadProfileImage} style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'gray',
            width: '30%',
          }}>
            <View>
              <Text><AddBlue /></Text>
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={{ flex: 0.8 }}>
          <View style={{ flexDirection: 'row', marginBottom: normalize(16), alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 0.48 }}>
              <Input value={user.firstName} label="First Name" onChange={(e: any) => handleChangeInput('firstName', e)} />
            </View>
            <View style={{ flex: 0.48 }}>
              <Input value={user.lastName} label="Last Name" onChange={(e: any) => handleChangeInput('lastName', e)} />
            </View>
          </View>
          {/* <Input value={user.username} label="Username" onChange={(e: any) => handleChangeInput('username', e)} />
          <View style={{ marginBottom: normalize(16) }} />
          <Input value={user.phoneNumber} label="Phone Number" onChange={(e: any) => handleChangeInput('phoneNumber', e)} /> */}
          <View style={{ marginBottom: normalize(16) }} />
          <Input value={user.email} label="Email" onChange={(e: any) => handleChangeInput('email', e)} />
          <View style={{ marginBottom: normalize(16) }} />
          <Input value={user.password} label="Password" secureTextEntry={true} onChange={(e: any) => handleChangeInput('password', e)} />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: normalize(10) }}>
            <CheckBox agree={user.agree} onToggleTerms={(e: any) => handleChangeInput('agree', !user.agree)} />
            <Typography customStyle={{ marginLeft: normalize(10) }} value="I agree to Tuks’s Privacy Policy and Terms of Use" />
          </View>
        </View>

        <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
          {
            loading ?
              <ActivityIndicator size="large" color="#00ff00" />
              :
              <Button disabled={loading} onPress={handleRegisterSubmit} title="Create account" />
          }
          <View style={{ marginBottom: normalize(40) }} />
        </View>
      </View>
    </Wrapper>
  )

}
