import Wrapper from "@/shared/components/wrapper";
import TitleScreen from "@/shared/components/title";
import { View } from "react-native";
import { normalize } from "@/shared/helpers";
import BackBtn from "@/shared/components/backBtn";
import Typography from "@/shared/components/Typography";
import Input from "@/shared/components/input";
import Button from "@/shared/components/buttons/normal";
import { useState } from "react";
import { emailActivationUrl } from "@/apis";

type EmailActivation = {
  activation_token: string
}
export default function ConfirmEmail() {
  const [emailActivation, setEmailActivation] = useState<EmailActivation>({
    activation_token: ''
  });


  const handleChangeInput = (key: string, value: string | number | boolean) => {
    setEmailActivation({
      ...emailActivation,
      [key]: value,
    });
  }


  const handleEmailActivationSubmit = async (e: any) => {
    e.preventDefault();
    const newEmailActivation = {
      activation_token: emailActivation.activation_token
    }
    const response = await (await fetch(emailActivationUrl, {
      method: 'POST',
      body: JSON.stringify(newEmailActivation),
      headers: {
        'Content-Type': 'application/json'
      }
    })).json();

  }
  return (
    <Wrapper>
      <View style={{ flex: 1, paddingHorizontal: normalize(24) }}>
        <BackBtn />
        <View style={{ marginTop: normalize(24), marginBottom: normalize(56) }}>
          <TitleScreen value="Confirm your email" />
          <Typography value="We sent a code to (email)" />
        </View>

        <View style={{ flex: 0.8 }}>
          <Input value={emailActivation.activation_token} label="Verification code" onChange={(e: any) => handleChangeInput('email_activation', e)} />

          <View style={{ marginVertical: normalize(20) }}>
            <Typography value="Didn’t get the email? Check your junk/spam  " />
          </View>
        </View>

        <View style={{ flex: 0.2 }}>
          <Button onPress={handleEmailActivationSubmit} title="Continue" />
        </View>
      </View>
    </Wrapper>
  )
}
