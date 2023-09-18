import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { useState } from 'react'
import { _styles } from "./styles";
import useDarkMode from "@/shared/hooks/useDarkMode";
import { normalize } from "@/shared/helpers";
import Typography from "@/shared/components/Typography";
import HeaderBack from "@/shared/components/headerBack";
import Wrapper from "@/shared/components/wrapper";
import { NavigationProps } from "@/shared/routes/stack";

interface ProfileProps{
  navigation: NavigationProps
}
export const SellerList = ({navigation}:ProfileProps) => {
    const { isDarkMode } = useDarkMode()
    const styles = _styles(isDarkMode);
    const [sellerList, setSellerList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
    function goToProfile(){
        navigation.navigate('sellerProfile')
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} >
            <Wrapper>
                <View style={{ marginHorizontal: 15,marginBottom:20}}>
                    <HeaderBack title="Seller List" />
                    {
                        sellerList.map(val => {
                            return (
                                <View style={styles.row} key={val} >
                                    <TouchableOpacity activeOpacity={8.0} onPress={goToProfile}>
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
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }

                </View>
            </Wrapper>
        </ScrollView>
    )
}
