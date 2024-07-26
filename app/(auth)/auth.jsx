import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Dimensions, Image } from "react-native";
import { images, icons } from "../../constants";
import SegmentedControl from "../../components/Segment";
import SignUp from "./sign-up";
import SignIn from "./sign-in";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const AuthRender = () => {
    const [selectedOption, setSelectedOption] = useState('Sign-in');
    const handleOptionPress = (option) => {
      setSelectedOption(option);
    };
   return (
    <GestureHandlerRootView>
        <SafeAreaView className="bg-white h-full">
    <ScrollView>
      <View
        className="w-full flex justify-center h-full px-4 my-6"
        style={{
          minHeight: Dimensions.get("window").height - 100,
        }}
      >
        {/* <Image
          source={images.logocolor}
          resizeMode="contain"
          className="w-[200px] mx-auto h-[60px]"
        /> */}
        <View className="w-full pt-6">
          <SegmentedControl
            options={['Sign-in', 'Sign-up']}
            selectedOption={selectedOption}
            onOptionPress={handleOptionPress}
          />
        </View>
        {selectedOption === 'Sign-in' &&
          <SignIn/>
        }
        {selectedOption === 'Sign-up' &&
          <SignUp
          />
        }
      </View>
    </ScrollView>
  </SafeAreaView>
    </GestureHandlerRootView>
   )
  }
  export default AuthRender;