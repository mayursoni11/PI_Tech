import { View } from "react-native";
import Wrapper from "@/shared/components/wrapper";
import Button from "@/shared/components/buttons/normal";
import { normalize } from "@/shared/helpers";
import Stepper from "@/modules/onboarding/components/stepper";
import { NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  login: undefined;
  register: undefined;
  sellerRegister:undefined
};
interface OnboardingProps {
  navigation: NavigationProp<RootStackParamList, 'login' | 'register' | 'sellerRegister'>;
}

export default function Onboarding({ navigation }: OnboardingProps) {
  function goToLogin() {
    navigation.navigate('login')
  }
  function goToRegister() {
    navigation.navigate('register')
  }
  function goToSellerRegister() {
    navigation.navigate('sellerRegister');
  }
  return (
    <Wrapper>
      <View style={{ flex: 1, paddingHorizontal: normalize(24) }}>
        <View style={{ flex: 0.8 }}>
          <Stepper />
        </View>
        <Button onPress={goToSellerRegister} title="Create Seller Account" />
        <View style={{ flex: 0.2 }}>
          <View style={{ marginVertical: normalize(8) }} />
          <Button onPress={goToRegister} title="Create account" />
          <View style={{ marginVertical: normalize(8) }} />
          <Button onPress={goToLogin} isPrimary={false} title="Sign in" />
        </View>
      </View>
    </Wrapper>
  )
}
