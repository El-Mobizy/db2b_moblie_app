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
  Dimensions, StatusBar, FlatList, Animated,
  ActivityIndicator
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux';
import { getAdDetails, toggleToFavorite } from '../../store/features/productSlice';
import { addToCart } from '../../store/features/cartSlice'
import { images, icons } from "../../constants";
import Modal from '../../components/Modal'; 
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Skeleton } from 'moti/skeleton';
import Reanimated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  FadeIn,
  LinearTransition
} from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('window');
// const images = [
//   {
//     "id": 1,
//     "url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
//   },
//   {
//     "id": 2,
//     "url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
//   },
//   {
//     "id": 3,
//     "url": "https://images.unsplash.com/photo-1444044205806-38f3ed106c10"
//   },
//   {
//     "id": 4,
//     "url": "https://images.unsplash.com/photo-1465101162946-4377e57745c3"
//   },
//   {
//     "id": 5,
//     "url": "https://images.unsplash.com/photo-1493815793586-f8d9b22b4e8c"
//   },
//   {
//     "id": 6,
//     "url": "https://images.unsplash.com/photo-1470115636492-6d2b56b9fb26"
//   },
//   {
//     "id": 7,
//     "url": "https://images.unsplash.com/photo-1431440869543-efaf3388c585"
//   },
//   {
//     "id": 8,
//     "url": "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56"
//   },
//   {
//     "id": 9,
//     "url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
//   },
//   {
//     "id": 10,
//     "url": "https://images.unsplash.com/photo-1493815793586-f8d9b22b4e8c"
//   }
// ]
const SkeletonCommonProps = {
  colorMode: 'light',
  transition: {
    type: 'timing',
    duration: 1500,
  },
  backgroundColor: '#D4D4D4',
};
const details = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const [details, setDetails] = useState({});
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const modalRef = useRef(null);
  const l = Object.entries(details).length;
  const files = details.files;
  useEffect(() => {
    console.log('Ce que jai pris', parsedUid);
    handleGetDetails(parsedUid);
    if (l > 0 && loader === true) {
      console.log('inhin');
      setLoader(false)
    }
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('default');
    };

  },
    [dispatch, uid, l])
  const { uid } = useLocalSearchParams();
  const parsedUid = JSON.parse(uid);
  const handleGetDetails = async (adUid) => {
    console.log(adUid)
    console.log('je suis pas dans try');
    try {
      console.log('je suis au tout debut');
      console.log('je suis au moins dedans');
      const response = await dispatch(getAdDetails(adUid)).unwrap();
      console.log('Requête terminée');
      const detail = response.data[0]
      setDetails(detail)
      console.log('details du produit', details);
      // setLoader(false)
    } catch (error) {
      // setLoader(false)
      console.log('je suis dans le bloc error', Error);
    } finally {
      // setLoader(false)
    }
  };
 const handleAddToCart = (item) => {
    const cartItem = {
        "id": item.ad_id,
        "category_title": item.category_title,
        "title" : item.title,
        "final_price": item.final_price,
        "image": item.image,
        "issynchronized" : item.issynchronized,
        "quantity" : null
    }
    console.log('donneés à envoyer pour lajout a la carte', cartItem)
    dispatch(addToCart(cartItem));
    openModal()
    setTitle("Success !")
    setMessage('Ad added to cart successfully')
  };
  const handleToggleFavorite = async (adId) => {
    console.log(adId)
    // const item = cart.find(item => item.ad_id === adId);

    // if (item && item.is_favorite == true) {
        
    // } 
    try {
      setLoader(true)
      openModal()
      const response = await dispatch(toggleToFavorite(adId)).unwrap();
      console.log('Requête terminée');
      const wislist = response.data
      console.log('liste des favoris', wislist);
      const info = response?.message ?? "An error occured. Please, try again later";
      if (info) {
        setLoader(false)
      }
      if ( info && info === "Product added to wishlist successfully !" || "Product retrieve from wishlist successfully !") {
          setTitle("Success !")
          setMessage(info)
      }
      else{
        setTitle("Error !")
        setMessage(info)
      }
    } catch (error) {
    } finally {
    }
  };
  const openModal = () => {
    modalRef.current.handleOpenModal();
  };
  const closeModal = () => {
    modalRef.current.handleCloseModal();
  };
  const [activeIndex, setActiveIndex] = useState(0)

  // const [selectedSize, setSelectedSize] = useState('XL');
  // const [selectedColor, setSelectedColor] = useState('red');
  const [scrollY] = useState(new Animated.Value(0));


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
      offset: index * width,
      animated: true
    })
    // scroll flatlist
  }
  const renderloading = () => {
    return <View className="w-screen justify-center items-center h-screen m-auto flex bg-white">
      {/* {loader &&  */}
      <ActivityIndicator
        animating={true}
        color="#7010ff"
        size={60}
        speed={3}
      />
    </View>
  }
  const renderHeader = () => (
    <Animated.View className="flex absolute w-full z-50 flex-row justify-between p-3 items-center">
      <TouchableOpacity activeOpacity={0.8} className="bg-white elevation w-fit rounded-full p-3" onPress={() => router.back()}>
        <Icon name="arrow-back-outline" size={24} color="#7910ff" />
      </TouchableOpacity>
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleToggleFavorite(details.ad_id)} className="bg-white elevation w-fit rounded-full p-3" >
        <Icon name={"heart-outline"} size={25} color={"#7910ff"} />
        {/* <Icon name={`${item.is_favorite ? "heart" : "heart-outline"}`} size={25} color={"#7910ff"} /> */}

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
    <View className="w-screen h-[85vh]">
      <FlatList
        onMomentumScrollEnd={ev => { scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width)) }}
        ref={topRef}
        className="w-full h-full"
        data={files}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="w-screen rounded-b-lg">
            <Image
              resizeMode='cover'
              className="w-screen rounded-b-lg h-full"
              source={{ uri: item.location }}
            />
          </View>
        )}
      />
      <View className="bg-white rounded-lg absolute elevation flex flex-row items-center justify-center bottom-[12%] p-1 mx-3 ">
        <FlatList
          ref={thumRef}
          className="w-full"
          data={files}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              // activeOpacity={}
              onPress={() => scrollToActiveIndex(index)}
            >
              <View className={` ${index === activeIndex ? 'border-2 elevation border-principal p-[2px] ' : 'border border-transparent'} rounded-xl mr-1`}>
                <Image
                  resizeMode='cover'
                  className={`w-16 border-red-600 elevation h-16 rounded-lg`}
                  source={{ uri: item.location }}
                />
              </View>
            </TouchableOpacity>

          )}
        />
      </View>

    </View>
  );


  const renderAddToCart = () => (
    <View className="flex bg-white flex-row w-full justify-between p-4 rounded-t-xl items-center border-t-2 border-t-[#eee]">
      <View className="">
        <Text className="text-[#666] text-sm font-normal">Price</Text>
        <Text className="text-2xl text-[#333] font-rmedium">XOF {details.final_price} </Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => handleAddToCart(details)} className="bg-principal space-x-2 px-5 py-3 items-center flex flex-row justify-center rounded-full" >
        <Icon name="cart-outline" size={24} color="#fff" />
        <Text className="text-base text-white font-rmedium " style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
  const renderAdDetailsCard = () => {

    const animatedIndex = useSharedValue(0);
    const [expanded, setExpanded] = useState(false);
    const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
    const colorsArray = [
      "#91A1B0",
      "#B11D1D",
      "#1F44A3",
      "#9F632A",
      "#1D752B",
      "#000000",
    ];
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("#B11D1D");
    const snapPoints = useMemo(() => ['12%', '80%'], []);
    const colors = {
      primary: '#070f18',
      gray: '#8b8989',
      lightGray: '#b2b2b2',
      light: '#fbfbfb',
      white: '#fff',
      black: '#000',
    };
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
    const headboxStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        animatedIndex.value,
        [0, 0.08],
        [1, 0],
        Extrapolation.CLAMP,
      ),
      height: animatedIndex.value > 0.08 ? 0 : 'auto',
      overflow: 'hidden',
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
    const CustomHandler = () => {
      return <View className="my-2"></View>;
    };
    const CustomBackground = ({ animatedIndex, style }) => {
      const containerStyle = useAnimatedStyle(() => ({
        ...style,
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        opacity: interpolate(
          animatedIndex.value,
          [0, 0.08],
          [0, 1],
          Extrapolation.CLAMP,
        ),
      }));
      return <Reanimated.View style={containerStyle} />;
    };
    const renderProductInfo = () => (
      <View className="py-2 ">
        <View className="flex flex-row space-x-1 justify-center items-center">
          <Text className="text-[#333] text-base font-rregular" >Posted by :</Text>
          <Text className="text-base font-rmedium text-principal" >{details.shop_title}</Text>
        </View>
        <View className="flex flex-row items-center justify-between my-2" >
          <Text className="text-2xl text-[#333] font-rmedium">{details.title}</Text>
          <Text className="font-rregular text-[#666]">{details.category_title}</Text>
        </View>
        <Text className="text-base text-[#333] font-rmedium">Description</Text>
        <Text className="text-[15px] font-rregular leading-6 text-[#666] " numberOfLines={expanded ? undefined : 3}>
          {details.description}...
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
              <View className={`flex-1 p-1 rounded-full ${selectedColor === color ? 'border-2' : ''}`}
                style={{ borderColor: selectedColor === color ? color : 'transparent' }}>
                <View className="flex-1 rounded-full" style={{ backgroundColor: color }}></View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
    return (
      <BottomSheet
        index={0}
        animatedIndex={animatedIndex}
        snapPoints={snapPoints}
        contentContainerStyle={{marginVertical: 15}}
        backgroundComponent={CustomBackground}
        handleComponent={CustomHandler}>
        <Animatable.View
          animation="fadeInUp"
          delay={500}
          easing="ease-in-out"
          duration={400}>
          <Reanimated.View className="flex justify-center bg-[#00000066] items-center" style={headboxStyle}>
            <AwesomeIcon className="" name="angle-double-up" size={26} color="#fff" />
            <Reanimated.Text className="text-base text-center text-white font-rregular " >
              Swipe up for details
            </Reanimated.Text>
          </Reanimated.View  >

        </Animatable.View>
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <Reanimated.View className="px-4" style={contentStyle}>
            {renderProductInfo()}
            {renderSizeSelector()}
            {renderColorSelector()}
            <Text className="mt-4 text-lg font-normal text-[#282534]">Weight : 1 pound</Text>
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium officia odio est quia fuga, reiciendis nostrum exercitationem minus assumenda veniam officiis vero. Ea voluptatibus voluptates ducimus praesentium, explicabo eveniet fugit.
            Ullam veniam facilis dolor, autem deleniti suscipit maxime voluptatum vel non voluptates magnam eius, obcaecati modi est in provident quisquam dicta amet possimus laudantium quidem reiciendis. Veritatis commodi tempore beatae!
            Optio qui in, ex hic dolorem itaque soluta sed illo pariatur eos delectus eum similique nisi id fugiat. Provident explicabo ipsa minus distinctio eius ex iusto, harum facilis blanditiis corrupti.</Text>
          </Reanimated.View>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  };
  return (
    <>
    <Skeleton.Group show={true}>
      <SafeAreaView style={styles.container}>
        {loader && renderloading()}
        <GestureHandlerRootView>
          <Animated.ScrollView
            className="bg-white z-50"
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >
            {renderHeader()}
            {renderImageGallery()}
            {renderAdDetailsCard()}
          </Animated.ScrollView>
          {renderAddToCart()}
        </GestureHandlerRootView>
      </SafeAreaView>
    </Skeleton.Group>
    <Modal isLoading={loader} ref={modalRef}>
       <View className="flex items-center">
       <Text className="text-xl text-center font-psemibold mb-4 text-black">{title}</Text>
          <Image
            source={`${title === "Success !" ? images.success : images.error}`}
            resizeMode='contain'
            className={`${title != "Success !" ? 'w-[100px] h-[50px]' : 'w-[200px] h-[70px]'}`}
          />
         <Text className="text-sm text-center my-4 text-gray-500 font-regular">{message || 'An error occured. Please, try again later'}</Text>
         <TouchableOpacity className={`${title === "Success !" ? 'bg-green-500' : "bg-red-500" } py-2 px-6 rounded-md text-white`} onPress={closeModal}>
         <Text className="text-white font-bold">Fermer</Text>
         </TouchableOpacity>
       </View>
     </Modal>
    </>
  );
}

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

export default details;
