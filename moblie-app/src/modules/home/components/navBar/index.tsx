import { normalize } from "@/shared/helpers";
import { TouchableOpacity, View } from "react-native";
import Typography from "@/shared/components/Typography";
import { FONT } from "@/shared/constans/fonts";
import color from "@/shared/constans/colors";
import { Bag, SearchNormal } from "@/shared/assets/icons";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";


export default function NavBar({openSearch, goToBag}: {openSearch: any, goToBag: any}) {

  return (
    <View style={styles.container}>
      <View>
        <Typography
          customStyle={{
            color: 'rgba(255, 255, 255, 0.5)'
          }}
          value="Good day for shopping," />
        <Typography
          customStyle={styles.nameUser}
          value="Arfi Maulana" />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={openSearch}>
          <SearchNormal width={28} height={28} />
        </TouchableOpacity>
        <View style={{marginHorizontal: normalize(12)}} />
        <TouchableOpacity onPress={goToBag} style={{position: 'relative'}}>
          <Bag width={28} height={28} />
          <View style={{
            backgroundColor: color.neutral.white,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: color.main.blue,
            width: normalize(17),
            height: normalize(17),
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: normalize(0),
            left: normalize(14),
            bottom: normalize(13)
          }}>
            <Typography customStyle={{
              color: color.main.blue,
              textAlign: 'center',
              fontSize: normalize(12),
              fontFamily: FONT.BOLD
            }} value="2" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
