import { View } from "react-native";
import Input from "@/shared/components/input";
import { SearchNormalGray } from "@/shared/assets/icons";
import Typography from "@/shared/components/Typography";
import React, { useState } from "react";
import {_styles} from './styles'
import useDarkMode from "@/shared/hooks/useDarkMode";
import BrandsAndCategories from "@/modules/home/components/brandsAndCategories";
import SearchResult from "@/modules/home/components/searchResult";

interface FilterProps {
  setIsOpen: any
  isOpen: boolean
}
export default function Filter({setIsOpen, isOpen}: FilterProps) {
  const [change, setChange] = useState(false)
  const {isDarkMode} = useDarkMode()
  const styles = _styles(isDarkMode)

  return (
    <View style={styles.fullContainer}>
      <View style={styles.container}>
        <View style={{flex: 0.97}}>
          <Input Icon={SearchNormalGray} value="" placeholder="Search" />
        </View>
        <Typography onPress={() => {
          setChange(false)
          setIsOpen(!isOpen)
        }} value="Cancel" />
      </View>

      {change ? (
        <SearchResult />
      ) : (
        <BrandsAndCategories setChange={() => setChange(true)} />
      )}
    </View>
  )
}
