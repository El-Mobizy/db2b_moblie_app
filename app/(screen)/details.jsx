import { Image, Text, TouchableOpacity, ScrollView, View } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Header from "../../components/Header";
import { router, useLocalSearchParams } from 'expo-router';
import { images, icons } from "../../constants";
import Icon from 'react-native-vector-icons/Ionicons';

const colorsArray = [
  "#91A1B0",
  "#B11D1D",
  "#1F44A3",
  "#9F632A",
  "#1D752B",
  "#000000",
];

const Details = () => {
  const { item } = useLocalSearchParams();
  const parsedItem = JSON.parse(item);
  useEffect(() => {
    // console.log('Ce que jai pris', parsedItem);
  }, [item]);

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");

  return (
    <>
      <View className="h-[420px] w-full">
        <Image source={images.welcome1} className="flex-1 resize-cover" />
      </View>
      <ScrollView className="p-5">
        <View className="flex-row justify-between">
          <Text className="text-lg font-light text-[#282534]">Category</Text>
          <Text className="text-lg font-light text-[#282534]">Sub-Category</Text>
        </View>
        <Text className="mt-4 text-2xl font-semibold text-[#282534]">
          {parsedItem.title}
        </Text>
        <Text className="mt-4 text-lg font-normal text-[#282534]">Products details</Text>
        <View><Text className="mt-2 text-sm font-light text-[#282534]">A men's jacket is a versatile outerwear garment designed to provide warmth, style, and protection. 
          Typically featuring a front opening with buttons</Text></View>
        <Text className="mt-4 text-lg font-normal text-[#282534]">Selected size: {selectedSize} </Text>
        <View className="flex-row my-2">
          {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
            <TouchableOpacity
              key={size}
              className={`py-1 px-2.5 rounded-md justify-center items-center mr-1 border border-principal ${selectedSize === size ? 'bg-principal' : ''}`}
              onPress={() => setSelectedSize(size)}
            >
              <Text className={`text-base font-semibold ${selectedSize === size ? 'text-white' : 'text-principal'}`}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="mt-4 text-lg font-normal text-[#282534]">Selected color </Text>
        <View className="flex-row">
          {colorsArray.map((color, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedColor(color)}
              className="h-9 mr-2 w-9 rounded-full"
            >
              <View  className={`flex-1 p-1 rounded-full ${selectedColor === color ? 'border-2' : ''}`}
                style={{ borderColor: selectedColor === color ? color : 'transparent' }}>
                <View className="flex-1 rounded-full" style={{ backgroundColor: color }}></View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="mt-4 text-lg font-normal text-[#282534]">Weight : 1 pound</Text>
        <View className="flex justify-between items-center my-5 flex-row">
          <Text className="text-xl font-psemibold text-black ">XOF {parsedItem.price}</Text>
          <TouchableOpacity className="bg-principal px-5 py-3 items-center flex flex-row space-x-2 justify-center rounded-full">
                <Icon name="cart-outline" size={25} color="#fff" />
            <Text className=" font-medium text-white">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default Details;
