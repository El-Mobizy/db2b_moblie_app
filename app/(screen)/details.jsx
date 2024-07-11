// import { Image, Text, TouchableOpacity, ScrollView, View } from "react-native";
// import React, { useContext, useState, useEffect } from "react";
// import Header from "../../components/Header";
// import { router, useLocalSearchParams } from 'expo-router';
// import { images, icons } from "../../constants";
// import Icon from 'react-native-vector-icons/Ionicons';


// const details = () => {
//   const { item } = useLocalSearchParams();
//   const parsedItem = JSON.parse(item);
//   useEffect(() => {
//     // console.log('Ce que jai pris', parsedItem);
//   }, [item]);

//   const [selectedSize, setSelectedSize] = useState("M");
//   const [selectedColor, setSelectedColor] = useState("#B11D1D");

//   return (
//     <>
//     <View className="h-screen w-screen ">
//       <View className=" flex justify-start flex-row h-[90%] w-full">
//         <Image source={images.welcome2} className="h-full  w-full" />
//       </View>
//       <View className="flex px-4 w-full justify-between bg-white items-center my-5 flex-row">
//           <View className="elevation-2 h-4 "></View>
//           <Text className="text-xs font-rmedium text-gray-500">Price</Text>
//           <Text className="text-2xl font-rmedium text-gray-700">XOF {parsedItem.price}</Text>
//           <TouchableOpacity className="bg-principal px-5 py-3 items-center flex flex-row space-x-2 justify-center rounded-full">
//               <Icon name="cart-outline" size={25} color="#fff" />
//               <Text className="font-rmedium text-white">Add to Cart</Text>
//           </TouchableOpacity>
//       </View>
//     </View>
      
//     </>
//   );
// };

// export default details;



import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, 
  Dimensions, StatusBar, Animated, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ProductScreen = ({ navigation }) => {
  const [selectedSize, setSelectedSize] = useState('XL');
  const [selectedColor, setSelectedColor] = useState('red');
  const [expanded, setExpanded] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const colors = ['red', 'green', 'yellow', 'purple', 'blue'];

  const thumbnails = [
    { id: 1, uri: 'URL_IMAGE_1' },
    { id: 2, uri: 'URL_IMAGE_2' },
    { id: 3, uri: 'URL_IMAGE_3' },
    { id: 4, uri: 'URL_IMAGE_4' },
    { id: 5, uri: 'URL_IMAGE_5' },
    { id: 6, uri: 'URL_IMAGE_6' },
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);

  const renderHeader = () => (
    <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="lock-closed-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderImageGallery = () => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: 'URL_DE_VOTRE_IMAGE_PRINCIPALE' }}
        style={styles.mainImage}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'transparent']}
        style={styles.gradientOverlay}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.thumbnailContainer}
        contentContainerStyle={styles.thumbnailContent}
      >
        {thumbnails.map((thumb) => (
          <TouchableOpacity key={thumb.id} style={styles.thumbnailWrapper}>
            <Image source={{ uri: thumb.uri }} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.moreThumbnails}>
          <Text style={styles.moreThumbnailsText}>+10</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderProductInfo = () => (
    <View style={styles.infoContainer}>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>Men's Jacket</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={18} color="#FFD700" />
          <Text style={styles.rating}>5.0</Text>
        </View>
      </View>
      <Text style={styles.subCategory}>Sub-Category</Text>
      <Text style={styles.description} numberOfLines={expanded ? undefined : 3}>
        A men's jacket is a versatile outerwear garment designed to provide warmth, style, and protection. Typically featuring a front opening with buttons...
      </Text>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text style={styles.readMore}>{expanded ? 'Read less' : 'Read more'}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSizeSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.sectionTitle}>Select size: {selectedSize}</Text>
      <View style={styles.sizeContainer}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[styles.sizeButton, selectedSize === size && styles.selectedSize]}
            onPress={() => setSelectedSize(size)}
          >
            <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>{size}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderColorSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.sectionTitle}>Select color: {selectedColor}</Text>
      <View style={styles.colorContainer}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorButton, { backgroundColor: color }, selectedColor === color && styles.selectedColor]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
    </View>
  );

  const renderAddToCart = () => (
    <View style={styles.bottomContainer}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.price}>XOF 10.000</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Icon name="cart-outline" size={24} color="#fff" style={styles.cartIcon} />
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {renderImageGallery()}
        {renderProductInfo()}
        {renderSizeSelector()}
        {renderColorSelector()}
        <Text style={styles.weight}>Weight: 1 pound</Text>
      </Animated.ScrollView>
      {renderAddToCart()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  imageContainer: {
    height: 400,
    width: '100%',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  thumbnailContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  thumbnailContent: {
    paddingHorizontal: 15,
  },
  thumbnailWrapper: {
    marginRight: 10,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  moreThumbnails: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreThumbnailsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  category: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 18,
    marginLeft: 5,
  },
  subCategory: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  readMore: {
    color: 'purple',
    marginTop: 5,
    fontWeight: 'bold',
  },
  selectorContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: (width - 60) / 6,
    alignItems: 'center',
  },
  selectedSize: {
    backgroundColor: 'purple',
    borderColor: 'purple',
  },
  sizeText: {
    fontSize: 16,
  },
  selectedSizeText: {
    color: '#fff',
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#000',
  },
  weight: {
    fontSize: 16,
    padding: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  priceContainer: {},
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  cartIcon: {
    marginRight: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductScreen;
