import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';

const PageTitle = ({name, returnRoute}) => {
  return (
    <View className="flex  w-full justify-center my-5 flex-row items-center">
                <TouchableOpacity
                    //  onPress={handlePress}
                     activeOpacity={0.7}
                     className="left-[15px] absolute"
                >
                    <View className="border-principal border h-10 w-10 flex rounded-full justify-center items-center">
                        <Icon name="arrowleft" size={20} color="#D142F5" />
                    </View> 
                </TouchableOpacity>
                
                <Text className="font-pmedium text-black text-xl">
                    { name }
                </Text>
    </View>
  )
}

export default PageTitle