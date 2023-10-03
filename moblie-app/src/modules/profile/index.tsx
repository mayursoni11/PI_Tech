import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import Balance from "@/shared/components/balance";
import HeroBackground from "@/shared/components/heroBackground";
import React from "react";
import { normalize } from "@/shared/helpers";
import Typography from "@/shared/components/Typography";
import { Edit, House, Note, Notification, SecuritySafe, Shield } from "@/shared/assets/icons";
import { _styles } from "./styles";
import useDarkMode from "@/shared/hooks/useDarkMode";
import Button from "@/shared/components/buttons/normal";
import { NavigationProps } from "@/shared/routes/stack";
import TitleSection from "@/shared/components/titleSection";
import { removeToken } from "@/apis/storageToken";

interface ProfileProps {
  navigation: NavigationProps
}
export default function Profile({ navigation }: ProfileProps) {
  const { isDarkMode } = useDarkMode()
  const styles = _styles(isDarkMode);

  const userLogout=()=>{
    removeToken();
    navigation.replace('login');
  }
  function goToOrder(){
    navigation.navigate('sellerList');
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <HeroBackground height={330}>
        <View style={{
          paddingHorizontal: normalize(24)
        }}>
          <Typography customStyle={styles.titleScreen} value="Profile" />
          <View style={styles.row}>
            <View style={[styles.row, { marginTop: normalize(24) }]}>
              <Image
                style={styles.avatar}
                source={{ uri: 'https://i.ibb.co/Y70KDJ8/Avatar-12.png' }}
              />
              <View style={{ marginLeft: normalize(14) }}>
                <Typography customStyle={styles.textUser} value="Arfi Ganteng" />
                <Typography customStyle={styles.email} value="arfi.ganteng@mail.com" />
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('editProfile')}>
              <Edit width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
        <Balance />
      </HeroBackground>

      <View style={styles.body}>
        <TitleSection value="Account Settings" />

        <View style={{ marginTop: normalize(20) }}>
          <View style={styles.containerOptions}>
            <House />
            <View style={{ marginLeft: normalize(14) }}>
              <Typography customStyle={styles.titleOption} value="Address Lists" />
              <Typography customStyle={styles.subtitleOption} value="Set shopping delivery address" />
            </View>
          </View>
          <View style={styles.containerOptions}>
            <SecuritySafe />
            <View style={{ marginLeft: normalize(14) }}>
              <Typography customStyle={styles.titleOption} value="Account Security" />
              <Typography customStyle={styles.subtitleOption} value="E-Wallet, credit cards, & instant debit registered" />
            </View>
          </View>
          <View style={styles.containerOptions}>
            <Notification />
            <TouchableOpacity activeOpacity={8.0} onPress={goToOrder}>
              <View style={{ marginLeft: normalize(14) }}>
                <Typography customStyle={styles.titleOption} value="Orders" />
                <Typography customStyle={styles.subtitleOption} value="56 orders" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.containerOptions}>
            <Notification />
            <View style={{ marginLeft: normalize(14) }}>
              <Typography customStyle={styles.titleOption} value="Notifications" />
              <Typography customStyle={styles.subtitleOption} value="Set any kind of notification message" />
            </View>
          </View>
        </View>

        <TitleSection value="About Tuks" />
        <View style={{ marginTop: normalize(20) }}>
          <View style={styles.containerOptions}>
            <Note />
            <View style={{ marginLeft: normalize(14) }}>
              <Typography customStyle={styles.titleOption} value="Terms & Conditions" />
            </View>
          </View>
          <View style={styles.containerOptions}>
            <Shield />
            <View style={{ marginLeft: normalize(14) }}>
              <Typography customStyle={styles.titleOption} value="Privacy Policy" />
            </View>
          </View>
        </View>
        <View style={{ marginVertical: normalize(20) }}>
          <Button onPress={userLogout} title="Logout" isPrimary={false} />
        </View>
      </View>
    </ScrollView>
  )
}
