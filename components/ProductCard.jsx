import React, { useEffect } from 'react'
import { View, Text, Image, TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import { images, icons } from "../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import { } from 'react-native-gesture-handler';
const COLORS = { principal: '#7910ff' }

const ProductCard = ({ item, handleProductClick, toggleFavorite, addProductToCart }) => {
  useEffect(() => {
    // console.log(item.image) 
  }, [item])
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        handleProductClick(item);
      }}
    >
      <View className="w-[45vw] bg-white border border-gray-50 elevation mb-4 rounded-2xl">
        <View className="w-full h-[230px] flex mx-auto flex-col items-center ">
          <View className="w-full rounded-2xl z-10 h-full overflow-hidden">
            <ImageBackground className='w-full rounded-2xl h-full' resizeMode='cover' source={{ uri: item.image }}>
              <View className="w-full relative h-full flex">
                <View className="bg-white h-[50px] elevation absolute top-2 right-2 w-[50px] flex rounded-full justify-center items-center">
                  <TouchableOpacity
                    onPress={() => {
                      toggleFavorite(item.id);
                    }}
                  >
                    <Icon name={`${item.is_favorite ? "heart" : "heart-outline"}`} size={25} color={COLORS.principal} />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
          
            <View className="bg-white absolute z-50 -bottom-6  h-[60px] w-[60px] flex rounded-full justify-center items-center">
              <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                addProductToCart(item);
              }}
            >
              <View className="bg-principal h-[50px] w-[50px] flex rounded-full justify-center items-center">
                <Icon name="cart-outline" size={25} color="#fff" />
              </View>
            </TouchableOpacity>
            </View>
        </View>
        <View className="product-info px-2 mt-5">
          <View className="flex justify-center w-full items-center flex-row">
            <Text className="font-rlight text-center text-gray-500 text-base">
              {item.title}
            </Text>
            {/* <View className="flex justify-between items-center flex-row gap-2 ">
            <Icon name="star" size={20} color="#F8BD00" />
            <Text className="text-base font-light">
              5.0
            </Text>
          </View> */}
          </View>
          <Text className="text-xl mt-1 text-center text-gray-700 font-rmedium">
            XOF {item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard



