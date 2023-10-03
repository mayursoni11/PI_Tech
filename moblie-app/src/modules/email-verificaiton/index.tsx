import Wrapper from "@/shared/components/wrapper";
import Typography from "@/shared/components/Typography";
import { Image, Text, View } from "react-native";
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
import color from "@/shared/constans/colors";

type RootStackParamList = {
  confirmEmail: undefined;
};
interface RegisterProps {
  navigation: NavigationProp<RootStackParamList, 'confirmEmail'>;
}

type EmailActivation = {
  activation_token: string
}
export default function EmailVerification({ navigation }: RegisterProps) {
  const [emailActivation, setEmailActivation] = useState<EmailActivation>({
    activation_token: ''
  });


  const handleChangeInput = (key: string, value: string | number | boolean) => {
    setEmailActivation({
      ...emailActivation,
      [key]: value,
    });
  }


  const handleRegisterSubmit = async (e: any) => {
    e.preventDefault();
    const newEmailActivation = {
      activation_token: emailActivation.activation_token
    }
    const response = await (await fetch(registerUrl, {
      method: 'POST',
      body: JSON.stringify(newEmailActivation),
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();

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

        <View style={{ flex: 0.8 }}>
          <View style={{ flexDirection: 'row', marginBottom: normalize(16), alignItems: 'center', justifyContent: 'space-between' }}>
            <Input value={emailActivation.activation_token} label="Enter Activation Email Url" onChange={(e: any) => handleChangeInput('activation_token', e)} />
          </View>

        </View>

        <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
          <Button onPress={handleRegisterSubmit} title="Verify Email" />
          <View style={{ marginBottom: normalize(40) }} />
        </View>
      </View>
    </Wrapper>
  )

}
