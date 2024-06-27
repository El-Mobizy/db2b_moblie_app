import React from 'react'
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity } from "react-native";
import { images, icons } from "../../constants";
import ProductForCard from '../../components/ProductForCard';
import PageTitle from '../../components/PageTitle';
import CustomButton from '../../components/CustomButton';
import Tags from '../../components/Tags';
import Icon from 'react-native-vector-icons/AntDesign';
const cart = () => {
    const [cartNumber, setCartNumber] = useState(6)

    return (
        <SafeAreaView className="bg-white relative h-screen">
            <PageTitle
                name={'My Cart' + '(' + (cartNumber) + ')'}
            />
            <ScrollView className="h-full relative  ">
                <View className=" mb-24 mx-[15px]">
                    <View>
                        <View className="flex space-x-4 flex-wrap flex-row justify-between w-full items-center">
                            <ProductForCard></ProductForCard>
                            <ProductForCard></ProductForCard>
                            <ProductForCard></ProductForCard>
                            <ProductForCard></ProductForCard>
                        </View>
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
        </SafeAreaView>
    )
}
export default cart