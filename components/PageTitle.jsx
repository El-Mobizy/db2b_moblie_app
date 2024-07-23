import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';

const PageTitle = ({name, returnRoute}) => {
  return (
    <View className="flex  w-full justify-center my-5 flex-row items-center">
                <TouchableOpacity
                     onPress={() => router.back()}
                     activeOpacity={0.7}
                     className="left-[15px] absolute"
                >
                    <View className="border-principal border h-10 w-10 flex rounded-full justify-center items-center">
                        <Icon name="arrowleft" size={20} color="#7910ff" />
                    </View> 
                </TouchableOpacity>
                
                <Text className="font-rmedium text-black text-xl">
                    { name }
                </Text>
    </View>
  )
}

export default PageTitle