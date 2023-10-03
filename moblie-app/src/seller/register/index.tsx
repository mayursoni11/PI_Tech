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
import { registerUrl, sellerCreateShopUrl } from "@/apis";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
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

type Seller = {
  firstName: string
  lastName: string
  zipCode: string
  address: string
  phoneNumber: number
  email: string
  password: string
  agree: boolean
}
export default function SellerRegister({ navigation }: RegisterProps) {
  const [seller, setSeller] = useState<Seller>({
    firstName: '',
    lastName: '',
    zipCode: '',
    address: '',
    phoneNumber: 0,
    email: '',
    password: '',
    agree: false
  });

  const [setSelectImage, setSetSelectImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [setSelectImageBase64, setSetSelectImageBase64] = useState('')

  const handleChangeInput = (key: string, value: string | number | boolean) => {
    setSeller({
      ...seller,
      [key]: value,
    });
  }

  const uploadProfileImage = () => {
    const options = {
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
    const newSeller = {
      name: `${seller.firstName} ${seller.lastName}`,
      email: seller.email,
      phoneNumber: seller.phoneNumber,
      zipCode: seller.zipCode,
      address: seller.address,
      password: seller.password,
      avatar: `data:image/jpeg;base64,${setSelectImageBase64}`
    }
    setLoading(true);
    const response = await (await fetch(sellerCreateShopUrl, {
      method: 'POST',
      body: JSON.stringify(newSeller),
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
          <TitleScreen value="Let’s create your Seller account" />
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
        <View style={{ flex: 0.8 }}>
          <View style={{ flexDirection: 'row', marginBottom: normalize(16), alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 0.48 }}>
              <Input value={seller.firstName} label="First Name" onChange={(e: any) => handleChangeInput('firstName', e)} />
            </View>
            <View style={{ flex: 0.48 }}>
              <Input value={seller.lastName} label="Last Name" onChange={(e: any) => handleChangeInput('lastName', e)} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: normalize(16), alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 0.48 }}>
              <Input value={seller.zipCode} label="ZipCode" onChange={(e: any) => handleChangeInput('zipCode', e)} />
            </View>
            <View style={{ flex: 0.48 }}>
              <Input value={seller.phoneNumber} label="Phone Number" onChange={(e: any) => handleChangeInput('phoneNumber', e)} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: normalize(16), alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 0.48 }}>
              <Input value={seller.email} label="Email" onChange={(e: any) => handleChangeInput('email', e)} />
            </View>
            <View style={{ flex: 0.48 }}>
              <Input value={seller.address} label="Address" onChange={(e: any) => handleChangeInput('address', e)} />
            </View>
          </View>
          <Input value={seller.password} label="Password" secureTextEntry={true} onChange={(e: any) => handleChangeInput('password', e)} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: normalize(10) }}>
            <CheckBox agree={seller.agree} onToggleTerms={(e: any) => handleChangeInput('agree', !seller.agree)} />
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
