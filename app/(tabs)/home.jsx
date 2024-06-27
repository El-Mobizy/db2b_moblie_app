import React from 'react'
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity } from "react-native";
import { images, icons } from "../../constants";
import Header from '../../components/Header';
import CategoryCard from '../../components/CategoryCard';
import ProductCard from '../../components/ProductCard';
import Slider from '../../components/Slide/Slider';
import Tags from '../../components/Tags';
import CartComponent from '../../components/cart';
import { CustomButton, FormField } from "../../components";
import { GestureHandlerRootView, } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/features/productSlice';
import { useNavigation } from "@react-navigation/native";





const home = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([])
    const { isLoading } = useSelector(state => state.products);
    const handleProductDetails = (item) => {    
        const jsonString = JSON.stringify(item);
        router.push(
        {
          pathname : "/details",
          params: {item: jsonString}
        }
        );
    };
    useEffect(() => {
        console.log('je suis au moins rentré');
        handleGetProducts()
    }, [dispatch]);
    const handleGetProducts = async () => {
        try {
            const response = await dispatch(getAllProducts()).unwrap();
            // console.log('Requête terminée');
            const info = response.data;
            setProducts(info)
            // console.log('les produits meme', products);
        } catch (error) {
        } finally {
        }
    }
    return (
        <SafeAreaView className="bg-white ">
            <GestureHandlerRootView className="w-full bg-white justify-center  items-center flex h-full">
                <Header></Header>
                <ScrollView className=" bg-white">
                    <Slider></Slider>
                    <View className=" mx-[15px] overflow-hidden mt-8" >
                        <View className="flex mb-2 flex-row justify-between w-full items-center">
                            <Text className="text-lg text-black font-medium">Category</Text>
                            <Text className="text-principal text-sm underline">See all</Text>
                        </View>
                        <View className="flex space-x-3 flex-row">
                            <CategoryCard />
                        </View>
                    </View>
                    <View className="mt-4 mb-24 mx-[15px]">
                        <View className="flex mb-2  flex-row justify-between w-full items-center">
                            <Text className="text-base text-black font-medium">Flash sales</Text>
                            <Text className="text-principal text-sm underline">See all</Text>
                        </View>
                        <View>
                            <Tags />
                        </View>
                        {!isLoading &&
                         <View className="flex space-x-4 flex-wrap flex-row justify-between w-full items-center">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    item={product}
                                    handleProductClick={handleProductDetails}
                                />
                            ))
                            }
                        </View>}
                    </View>
                </ScrollView>
                <CartComponent></CartComponent>
            </GestureHandlerRootView>
        </SafeAreaView>
    )
}
export default home