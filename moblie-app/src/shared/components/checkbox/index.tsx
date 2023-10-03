import checkIcon from './check.png'
import { Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { normalize } from "@/shared/helpers";
import colors from "@/shared/constans/colors";
interface checkboxProps{
  agree:boolean
  onToggleTerms:Function
}

export default function CheckBox({agree,onToggleTerms}:checkboxProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(agree)
 

  return (
    <TouchableOpacity onPress={onToggleTerms} style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image style={{
        tintColor: agree ? colors.main.blue : 'white',
        borderWidth: agree ? 0 : 1,
        borderColor: 'gray',
        borderRadius: normalize(6),
        width: normalize(20),
        height: normalize(20)
      }} source={checkIcon} />
    </TouchableOpacity>
  )
}
