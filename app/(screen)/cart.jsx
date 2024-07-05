import React from 'react'
import { useState, useEffect, useRef } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity } from "react-native";
import { images, icons } from "../../constants";
import ProductForCard from '../../components/ProductForCard';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import BottomSheet from "../../components/BottomSheet"
import Tags from '../../components/Tags';
import Icon from 'react-native-vector-icons/AntDesign';
import { getListCart } from '../../store/features/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const cart = () => {
    const bottomSheetRef = useRef(null);
    const dispatch = useDispatch();
    const [clickedProduct, setClickedProduct] = useState({})
    const [listCart, setListCart] = useState([])
    const [status, setStatus] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [viewHeight, setViewHeight] = useState(0);

    const { isLoading, cart, total } = useSelector(state => state.products);
    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setViewHeight(height);
        console.log('Content Height:', viewHeight);
        if (bottomSheetRef.current) {
            bottomSheetRef.current.scrollTo(-(height));
        }
    };
    useEffect(() => {
        console.log(total);
        // console.log('je suis au moins rentré');
        handleGetListCart()
        console.log('au moins dans le useEffect');
    }, [dispatch]);
    const handleGetListCart = async () => {
        try {
            const response = await dispatch(getListCart()).unwrap();
            console.log('Requête de carte terminée');
            const info = response.data.data;
            setListCart(info)
            console.log('les produits meme', info);
        } catch (error) {
        } finally {
        }
    }
    const [cartNumber, setCartNumber] = useState(6)
    const openBottomSheet = () => {
        console.log('j\'ouvre le bottom sheet'); // Scroll to a position, adjust as needed
        setStatus(true)
        console.log(viewHeight);
        bottomSheetRef.current.scrollTo(-viewHeight);
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current.scrollTo(0); // Scroll back to top position to close
    };
    const handleAdChange = (product) => {
        setClickedProduct(product)
    }
    const deleteAction = (id) => {
        console.log('Id du produit à supprimer', id);
        const filteredList = cart.filter(item => item.ad_id === id);
        handleAdChange(filteredList[0]);
        console.log(clickedProduct);
        openBottomSheet();

    }
    return (
        <GestureHandlerRootView>
            <SafeAreaView className="bg-white relative h-screen">
                <PageTitle
                    name={'My Cart' + '(' + (total) + ')'}
                />
                <ScrollView className="h-full relative">
                    <View className=" mb-24 mx-[15px]">
                        <View>
                            {!isLoading &&
                                <View className="flex space-x-4 flex-wrap flex-row justify-between w-full items-center">
                                    {cart.map((list) => (
                                        <ProductForCard
                                            key={list.ad_id}
                                            item={list}
                                            ondelete={deleteAction}
                                        // handleProductClick={handleProductDetails}
                                        // toggleFavorite={handleToggleFavorite}
                                        // addProductToCart={handleAddToCart}
                                        />
                                    ))
                                    }
                                    {!isLoading && cart.length === 0 && (
                                        <View className="flex flex-row items-center w-full justify-center h-full">
                                            <Text className="text-lg text-gray-500">No products available</Text>
                                        </View>
                                    )}
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>
                <View className="bg-white p-4 fixed bottom-0">
                    <CustomButton
                        title="CHECKOUT"
                        handlePress={() => router.push("/Productdetails")}
                        containerStyles="w-full my-7 min-h-[50px]"
                        textStyles={"text-base font-bold"}
                    />
                </View>
                {status &&
                    <BottomSheet ref={bottomSheetRef} isVisible={isVisible}>
                        <View onLayout={handleLayout} className="flex justify-center w-full h-fit py-6 items-center flex-col mx-auto">
                            <View >
                                <Text className="text-center mb-4 text-lg text-gray-500 font-rmedium">Remove from cart ?</Text>
                                <ProductForCard
                                    item={clickedProduct}
                                // handleProductClick={handleProductDetails}
                                // toggleFavorite={handleToggleFavorite}
                                // addProductToCart={handleAddToCart}
                                />
                                <View className="flex  mt-4 justify-between items-center space-x-3 flex-row w-full">
                                    <TouchableOpacity className="border border-principal px-6 py-3 items-center flex flex-row space-x-2 justify-center rounded-full">
                                        <Text className=" text-principal font-rmedium ">Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className="bg-principal px-5 py-3 items-center flex flex-row space-x-2 justify-center rounded-full">
                                        <Text className=" font-rmedium text-white">Yes, remove it</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </View>
                    </BottomSheet>
                }
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
export default cart