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



import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, 
  Dimensions, StatusBar, Animated, FlatList
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
 const images = [
    {
      "id": 1,
      "url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
    },
    {
      "id": 2,
      "url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
    },
    {
      "id": 3,
      "url": "https://images.unsplash.com/photo-1444044205806-38f3ed106c10"
    },
    {
      "id": 4,
      "url": "https://images.unsplash.com/photo-1465101162946-4377e57745c3"
    },
    {
      "id": 5,
      "url": "https://images.unsplash.com/photo-1493815793586-f8d9b22b4e8c"
    },
    {
      "id": 6,
      "url": "https://images.unsplash.com/photo-1470115636492-6d2b56b9fb26"
    },
    {
      "id": 7,
      "url": "https://images.unsplash.com/photo-1431440869543-efaf3388c585"
    },
    {
      "id": 8,
      "url": "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56"
    },
    {
      "id": 9,
      "url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
    },
    {
      "id": 10,
      "url": "https://images.unsplash.com/photo-1493815793586-f8d9b22b4e8c"
    }
  ]

const ProductScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  // const [selectedSize, setSelectedSize] = useState('XL');
  // const [selectedColor, setSelectedColor] = useState('red');
  const [expanded, setExpanded] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const colors = ['red', 'green', 'yellow', 'purple', 'blue'];
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");
  const thumbnails = [
    { id: 1, uri: 'http://192.168.100.159:8001/image/ad/6687e09711264.jpeg' },
    { id: 2, uri: 'http://192.168.100.159:8001/image/ad/6687e09711264.jpeg' },
    { id: 3, uri: 'http://192.168.100.159:8001/image/ad/6687e09711264.jpeg' },
    { id: 4, uri: 'http://192.168.100.159:8001/image/ad/668d09b53a09d.jpeg' },
    { id: 5, uri: 'http://192.168.100.159:8001/image/ad/6687e09711264.jpeg' },
    { id: 6, uri: 'http://192.168.100.159:8001/image/ad/6687e09711264.jpeg' },
  ];
  const colorsArray = [
    "#91A1B0",
    "#B11D1D",
    "#1F44A3",
    "#9F632A",
    "#1D752B",
    "#000000",
  ];
  const { width, height } = Dimensions.get('window');
  const topRef = useRef(null);
  const thumRef = useRef(null)
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const scrollToActiveIndex = (index) => {
    setActiveIndex(index)
    topRef?.current?.scrollToOffset({
      offset: index * width ,
      animated: true
    })
        // scroll flatlist
  }
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);

  const renderHeader = () => (
    <Animated.View className="flex absolute w-full z-50 flex-row justify-between p-3 items-center">
      <TouchableOpacity activeOpacity={0.8} className="bg-white elevation w-fit rounded-full p-3" onPress={() => router.back()}>
        <Icon name="arrow-back-outline" size={24} color="#7910ff" />
      </TouchableOpacity>
      <View>
        <TouchableOpacity className="bg-white elevation w-fit rounded-full p-3" >
          <Icon name="heart-outline" size={24} color="#7910ff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  // const renderImageGallery = () => (
  //   <View style={styles.imageContainer}>
  //     <Image
  //       source={{ uri: 'http://192.168.100.159:8001/image/ad/6687e09711264.jpeg' }}
  //       style={styles.mainImage}
  //     />
  //     <ScrollView
  //       horizontal
  //       showsHorizontalScrollIndicator={false}
  //       style={styles.thumbnailContainer}
  //       contentContainerStyle={styles.thumbnailContent}
  //     >
  //       {thumbnails.map((thumb) => (
  //         <TouchableOpacity key={thumb.id} style={styles.thumbnailWrapper}>
  //           <Image source={{ uri: thumb.uri }} style={styles.thumbnail} />
  //         </TouchableOpacity>
  //       ))}
  //       <TouchableOpacity style={styles.moreThumbnails}>
  //         <Text style={styles.moreThumbnailsText}>+10</Text>
  //       </TouchableOpacity>
  //     </ScrollView>
  //   </View>
  // );
  const renderImageGallery = () => (
    <View className="w-screen h-[400px]">
     <FlatList
        onMomentumScrollEnd={ev => {scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))}}
        ref={topRef} 
        className="w-full h-full "
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View className="w-screen">
                <Image 
                    resizeMode='cover'
                    className="w-screen h-full"
                    source={{uri: item.url}}
                />
          </View>
          )} 
     />
     <View className="bg-white rounded-xl absolute flex flex-row items-center justify-center bottom-4 p-1 mx-3 ">
      <FlatList 
        ref={thumRef}
        className="w-full"
        data={images}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{display: 'flex', alignItems: 'center'}}
        renderItem={({item, index}) => (
          <TouchableOpacity 
          // activeOpacity={}
            onPress={() => scrollToActiveIndex(index)}
          >
            <View className={` ${index === activeIndex ? 'border-2 border-principal p-[2px] ' : 'border border-transparent'} rounded-xl mr-1`}>
                <Image 
                    resizeMode='cover'
                    className={`w-16 border-red-600 h-16 rounded-xl`}
                    source={{uri: item.url}}
                />
          </View>
          </TouchableOpacity>
          
          )} 
     />
     </View>
     
    </View>
  );
  const renderProductInfo = () => (
    <View className="px-4 py-2">
       <View className="flex flex-row space-x-1 justify-center items-center">
          <Text className="text-[#333] text-base font-rregular" >Posted by :</Text>
          <Text className="text-base font-rmedium text-principal" >Sub-Category</Text>
      </View>
      <View className="flex flex-row items-center justify-between my-2" >
        <Text className="text-xl text-[#333] font-rmedium">Men's Jacket</Text>
        <Text className="font-rregular text-[#666]">Sub-category</Text>
      </View>
      <Text className="text-base text-[#333] font-rmedium">Description</Text>
      <Text className="text-[15px] font-rregular leading-6 text-[#666] " numberOfLines={expanded ? undefined : 3}>
        A men's jacket is a versatile outerwear garment designed to provide warmth, style, and protection. Typically featuring a front opening with buttons...
      </Text>
      <TouchableOpacity activeOpacity={0.8} className="" onPress={() => setExpanded(!expanded)}>
        <Text className="text-principal text-sm font-rmedium">{expanded ? 'Read less' : 'Read more'}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSizeSelector = () => (
    <View className="w-full">
      <Text className="mt-4 text-lg font-normal font-rregular text-[#333]">Selected size: {selectedSize} </Text>
        <View className="flex-row my-2">
          {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
            <TouchableOpacity
              key={size}
              className={`py-2 px-3 rounded-md justify-center items-center mr-1 border border-principal ${selectedSize === size ? 'bg-principal' : ''}`}
              onPress={() => setSelectedSize(size)}
            >
              <Text className={`text-base font-rmedium ${selectedSize === size ? 'text-white' : 'text-principal'}`}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
    </View>
  );

  const renderColorSelector = () => (
    <View className="w-full">
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
    </View>
  );

  const renderAddToCart = () => (
    <View className="flex flex-row w-full justify-between p-4 rounded-t-xl items-center border-t-2 border-t-[#eee]">
      <View className="">
        <Text className="text-[#666] text-sm font-normal">Price</Text>
        <Text className="text-2xl text-[#333] font-rmedium">XOF 10.000</Text>
      </View>
      <TouchableOpacity className="bg-principal space-x-2 px-5 py-3 items-center flex flex-row justify-center rounded-full" >
        <Icon name="cart-outline" size={24} color="#fff" />
        <Text className="text-base text-white font-rmedium " style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {renderHeader()}
        {renderImageGallery()}
        {renderProductInfo()}
        {renderSizeSelector()}
        {renderColorSelector()}
        <Text className="mt-4 text-lg font-normal text-[#282534]">Weight : 1 pound</Text>
      </Animated.ScrollView>
    
  
      {renderAddToCart()}
    </SafeAreaView>
  );
};

const AnimatedDivider = Animated.createAnimatedComponent(Divider);

const TripDetailsCard = ({trip}) => {
  const animatedIndex = useSharedValue(0);
  const snapPoints = useMemo(() => ['30%', '80%'], []);
  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.08],
      [colors.white, colors.primary],
    ),
    marginBottom: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 10],
      Extrapolation.CLAMP,
    ),
  }));

const locationStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.08],
      [colors.white, colors.lightGray],
    ),
    fontSize: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [sizes.title, sizes.body],
      Extrapolation.CLAMP,
    ),
  }));

const locationIonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [0, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [40, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <BottomSheet
      index={0}
      animatedIndex={animatedIndex}
      snapPoints={snapPoints}
      backgroundComponent={CustomBackground}
      handleComponent={CustomHandler}>
      <Animatable.View
        style={styles.header}
        animation="fadeInUp"
        delay={500}
        easing="ease-in-out"
        duration={400}>
        <Animated.Text style={[styles.title, titleStyle]}>
          {trip.title}
        </Animated.Text>
        <View style={styles.location}>
          <Animated.Text style={[styles.locationText, locationStyle]}>
            {trip.location}
          </Animated.Text>
          <Animated.View style={locationIonStyle}>
            <Icon icon="Location" size={20} style={styles.locationIcon} />
          </Animated.View>
        </View>
      </Animatable.View>
      <AnimatedDivider style={contentStyle} />
      <BottomSheetScrollView
        style={styles.scrollBox}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Animated.View style={contentStyle}>
          <RatingOverall rating={trip.rating} containerStyle={styles.rating} />
          <SectionHeader
            title="Summary"
            containerStyle={styles.sectionHeader}
            titleStyle={styles.sectionTitle}
          />
          <View style={styles.summary}>
            <Text style={styles.summaryText}>{trip.description}</Text>
          </View>
          <SectionHeader
            title="Hotels"
            containerStyle={styles.sectionHeader}
            titleStyle={styles.sectionTitle}
            onPress={() => {}}
            buttonTitle="See All"
          />
          <HotelsCarousel hotels={trip.hotels} />
          <SectionHeader
            title="Reviews"
            containerStyle={styles.sectionHeader}
            titleStyle={styles.sectionTitle}
            onPress={() => {}}
            buttonTitle="See All"
          />
          <Reviews reviews={trip.reviews} />
        </Animated.View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
  },
  title: {
    fontSize: sizes.title,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationText: {
    fontSize: sizes.title,
    color: colors.white,
  },
  locationIcon: {
    tintColor: colors.gray,
  },
  scrollBox: {
    marginTop: spacing.s,
    marginBottom: spacing.m,
  },
  sectionHeader: {
    marginTop: spacing.m,
  },
  sectionTitle: {
    color: colors.lightGray,
    fontWeight: 'normal',
  },
  summary: {
    marginHorizontal: spacing.l,
  },
  summaryText: {
    color: colors.primary,
  },
  rating: {
    marginHorizontal: spacing.l,
  },
});





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
  
});

export default ProductScreen;
