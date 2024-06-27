import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Alert, Text } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getAllFavorites, addToFavorite } from '../../store/features/productSlice';
import ProductCard from '../../components/ProductCard';
import PageTitle from '../../components/PageTitle';
import Tags from '../../components/Tags';
import { router } from "expo-router";

const Wishlist = () => {
    const dispatch = useDispatch();
    const [wishlist, setWishlist] = useState([]);
    const { isLoading } = useSelector(state => state.products);

    useEffect(() => {
        handleGetFavorites();
    }, [dispatch]);

    const handleGetFavorites = async () => {
        try {
            const response = await dispatch(getAllFavorites()).unwrap();
            const info = response.data.data;
            console.log("wishlist",info)
            setWishlist(Array.isArray(info) ? info : []);
        } catch (error) {
            console.error("Erreur lors de la récupération des favoris", error);
        }
    };

    const handleProductDetails = (item) => {
        const jsonString = JSON.stringify(item);
        router.push(
            {
                pathname: "/details",
                params: { item: jsonString }
            }
        );
    };

    const handleAddFavorite = async (adId) => {
        try {
            const response = await dispatch(addToFavorite(adId)).unwrap();
            if (response.message === "Ad added to wishlist successfully !") {
                Alert.alert("Success", "Ad added to wishlist successfully!");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout aux favoris", error);
            Alert.alert("Error", "Failed to add to wishlist.");
        }
    };

    return (
        <SafeAreaView className="bg-white relative h-screen">
            <PageTitle name={'My Wishlist'} />
            <ScrollView className="h-full relative">
                <View className="mb-24 mx-[15px]">
                    <Tags />
                    {!isLoading && wishlist.length > 0 &&
                        <View className="flex space-x-4 flex-wrap flex-row mt-2 justify-between w-full items-center">
                            {wishlist.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    item={product}
                                    handleProductClick={handleProductDetails}
                                    toggleFavorite={handleAddFavorite}
                                />
                            ))}
                        </View>
                    }
                    {!isLoading && wishlist.length === 0 && (
                        <View className="flex items-center justify-center h-full">
                            <Text className="text-lg text-gray-500">No items in wishlist</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Wishlist;
