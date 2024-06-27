import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { images, icons } from "../constants";
import Icon from 'react-native-vector-icons/Ionicons';


const Header = () => {
  return (
    <View className="">
       <View className="flex flex-row justify-between items-center m-[15px]">
        <View className="flex space-x-3 justify-center items-center flex-row">
          <View className="bg-slate-100 h-10 w-10 flex rounded-full justify-center items-center">
          <TouchableOpacity 
          >
          <Icon name={"menu-outline"} size={25} color="#00000080" />
          </TouchableOpacity>
          </View>
          <Image
              source={images.logo}
              resizeMode='contain'
              className='w-[80px] h-[45px]'
            />
        </View>

        <View className="flex flex-row gap-3">
          <View className="relative bg-slate-100 flex rounded-full justify-center items-center h-10 w-10">
            <Icon name="storefront-outline" size={25} color="#00000080" />
            <View className="bg-[#D142F5] absolute right-1 top-1 flex justify-center items-center w-4 h-4  rounded-full ">
              <Text className="text-white text-xs font-bold">+</Text>
            </View>
          </View>
          <View className="relative flex rounded-full justify-center items-center bg-slate-100 h-10 w-10">
            <Icon name="notifications-outline" size={25} color="#00000080" />
            <View className="bg-[#D142F5] absolute right-2 top-1 flex justify-center items-center w-4 h-4  rounded-full ">
              <Text className="text-white text-xs font-bold">3</Text>
            </View>
          </View>
        </View>

      </View>
      <View className=" flex justify-between flex-row items-center mb-5 mx-[15px]">
        <View className="h-11 px-4 rounded-lg w-5/6 flex overflow-hidden relative flex-row items-center border bg-[#d9d9d950] border-gray-100">
          <Icon name="search" className="absolute" size={20} color="#00000033" />
          <TextInput
            className="flex items-center w-full h-full pl-4 text-gray-400 text-base"
            // value={valeur}
            // type={type}
            placeholder="Search..."
            placeholderTextColor="#00000033"
          // onChangeText={(text) => {
          //   handleChangeText(text);
          //   validate(text);
          // }}
          // onFocus={fonc}
          // onBlur={fonc1}
          ></TextInput>
        </View>
        <View className="bg-principal h-11 w-11 flex rounded-full justify-center items-center">
          <Image 
            source={icons.filter}
            resizeMode='contain'
            className="w-6 h-6"
          />
        </View>
      </View>
    </View>
  )
}
export default Header