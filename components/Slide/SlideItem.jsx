import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
    ImageBackground
  } from 'react-native';
  import React from 'react';
  import { images, icons } from "../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomButton } from "../../components";

  const {width, height} = Dimensions.get('screen');
  const split = (chaine, n) => {
    if (chaine.length <= n) {
        return chaine;
    } else {
        const chaineRaccourcie = chaine.substring(0, n) + '...';
        return chaineRaccourcie
    }
}
  const SlideItem = ({item}) => {
    return (
            
      <View className="w-[90vw] space-x-4 mx-[5vw] h-[160px] flex flex-row justify-between items-center overflow-hidden bg-[#7910ff20] rounded-md"  >
        <View className="w-1/2 p-3 " >
          <Text className="font-medium text-start text-[#000000B3] text-xl" >{split(item.title, 12)}</Text>
          <Text className="font-light text-start text-[#000000B3] my-3 text-sm" >{split(item.description, 30)}</Text>
          <CustomButton
            title="Shop now"
            handlePress={() => router.push("/homepage")}
            containerStyles="w-3/4 rounded-full min-h-[40px]"
            textStyles={"text-sm font-light"}
          />
        </View>
        <Image
          source={item.img}
          resizeMode="contain"
          className="h-full absolute -right-[15%] w-[235px]"
        />
      </View>
    );
  };
  
  export default SlideItem;
  
    
  