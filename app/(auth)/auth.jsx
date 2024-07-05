import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Dimensions, Image } from "react-native";
import { images, icons } from "../../constants";
import SegmentedControl from "../../components/Segment";
import SignUp from "./sign-up";
import SignIn from "./sign-in";
const AuthRender = () => {
    const [selectedOption, setSelectedOption] = useState('Connexion');
    const handleOptionPress = (option) => {
      setSelectedOption(option);
    };
   return (
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
            options={['Connexion', 'Inscription']}
            selectedOption={selectedOption}
            onOptionPress={handleOptionPress}
          />
        </View>
        {selectedOption === 'Connexion' &&
          <SignIn/>
        }
        {selectedOption === 'Inscription' &&
          <SignUp
          />
        }
      </View>
    </ScrollView>
  </SafeAreaView>)
  }
  export default AuthRender;