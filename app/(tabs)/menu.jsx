import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import profile from '../assets/profile.png';
// Tab ICons...
import home from '../assets/home.png';
import search from '../assets/search.png';
import notifications from '../assets/bell.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
// Menu
import menu from '../assets/menu.png';
import close from '../assets/close.png';

// Photo
import photo from '../assets/photo.jpg';

import { Link, router } from "expo-router";
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
import { getAllProducts, toggleToFavorite, addToCart } from '../../store/features/productSlice';
import { useNavigation } from "@react-navigation/native";
import Modal from '../../components/Modal'; 
const Home = ({ handleSwitch, showMenu }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const modalRef = useRef(null);
  const [loader, setLoader] = useState(false)
  const { isLoading } = useSelector(state => state.products);
  const handleProductDetails = (item) => {
    const jsonString = JSON.stringify(item);
    router.push(
      {
        pathname: "/details",
        params: { item: jsonString }
      }
    );
  };

  // const handleToggleFavorite = (productId) => {
  //   setLoader(true)
  //   openModal()
  //   dispatch(toggleFavorite(productId))
  //     .unwrap()
  //     .then(updatedProducts => {
  //       console.log('Produits mis à jour :', updatedProducts);
  //       setLoader(false)
  //       setTitle("Success !")
  //       setMessage("Ad added to wishlist successfully !")
  //       setProducts(updatedProducts)
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors du basculement des favoris :', error);
  //       setTitle("Error !")
  //       setMessage("An error occured. Please, try again later")
  //     });
  // };
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
  handleAddToCart = async (adId) => {
    console.log(adId)
    try {
      setLoader(true)
      openModal()
      const response = await dispatch(addToCart(adId)).unwrap();
      console.log('Requête terminée', response);
      
      const info = response?.message ?? "An error occured. Please, try again later";
      if (info) {
        setLoader(false)
      }
      if ( info && info === "product add to cart sucessfully") {
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
  useEffect(() => {
    // console.log('je suis au moins rentré');
    handleGetProducts()
  }, [dispatch]);
  const handleGetProducts = async () => {
    try {
      const response = await dispatch(getAllProducts()).unwrap();
      console.log('Requête terminée');
      const info = response.data;
      setProducts(info)
      console.log('les produits meme', info);
    } catch (error) {
    } finally {
    }
  }
  const openModal = () => {
    modalRef.current.handleOpenModal();
  };
  const closeModal = () => {
    modalRef.current.handleCloseModal();
  };
  return (
    <>
      <GestureHandlerRootView className="w-full justify-center items-center flex h-full">
        <View className="header mt-6">
          <View className="flex flex-row justify-between items-center m-[15px]">
            <View className="flex space-x-3  justify-center items-center flex-row">
              <View className="bg-slate-100 h-10 w-10 flex rounded-full justify-center items-center">
                <TouchableOpacity
                  onPress={handleSwitch}
                > 
                  <Icon name={showMenu ? "close" : "menu-outline"} size={30} color="#00000080" />
                </TouchableOpacity>
              </View>
              <Image
                source={images.logo}
                resizeMode='contain'
                className='w-[80px] h-[45px]'
              />
            </View>
            <View className="flex flex-row gap-3">
              <View className="relative bg-slate-100 flex rounded-full justify-center items-center h-10 w-10">
                <Icon name="storefront-outline" size={25} color="#00000080" />
                <View className="bg-principal absolute right-1 top-1 flex justify-center items-center w-4 h-4  rounded-full ">
                  <Text className="text-white text-xs font-bold">+</Text>
                </View>
              </View>
              <View className="relative flex rounded-full justify-center items-center bg-slate-100 h-10 w-10">
                <Icon name="notifications-outline" size={25} color="#00000080" />
                <View className="bg-principal absolute right-2 top-1 flex justify-center items-center w-4 h-4  rounded-full ">
                  <Text className="text-white text-xs font-bold">3</Text>
                </View>
              </View>
            </View>

          </View>
          <View className=" flex justify-between flex-row items-center mb-5 mx-[15px]">
            <View className="h-11 px-4 rounded-lg w-5/6 flex overflow-hidden relative flex-row items-center border bg-[#d9d9d950] border-gray-100">
              <Icon name="search" className="absolute" size={20} color="#00000033" />
              <TextInput
                className="flex items-center w-full h-full pl-4 text-gray-400 text-base"
                // value={valeur}
                // type={type}
                placeholder="Search..."
                placeholderTextColor="#00000033"
              // onChangeText={(text) => {
              //   handleChangeText(text);
              //   validate(text);
              // }}
              // onFocus={fonc}
              // onBlur={fonc1}
              ></TextInput>
            </View>
            <View className="bg-principal h-11 w-11 flex rounded-full justify-center items-center">
              <Image
                source={icons.filter}
                resizeMode='contain'
                className="w-6 h-6"
              />
            </View>
          </View>
        </View>








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
              <View className="flex space-x-4 flex-wrap flex-row mt-2 justify-between w-full items-center">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    item={product}
                    handleProductClick={handleProductDetails}
                    toggleFavorite={handleToggleFavorite}
                    addProductToCart={handleAddToCart}
                  />
                ))
                }
                {!isLoading && products.length === 0 && (
                        <View className="flex items-center justify-center h-full">
                            <Text className="text-lg text-gray-500">No products available</Text>
                        </View>
                    )}
              </View>}
          </View>
        </ScrollView>
        <CartComponent></CartComponent>
      </GestureHandlerRootView>
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
  )
}

export default function App() {
  const [currentTab, setCurrentTab] = useState("Home");
  // To get the curretn Status of menu ...
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const switchMenu = () => {
    // Do Actions Here....
    // Scaling the view...
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true
    })
      .start()

    Animated.timing(offsetValue, {
      // YOur Random Value...
      toValue: showMenu ? 0 : 230,
      duration: 300,
      useNativeDriver: true
    })
      .start()

    Animated.timing(closeButtonOffset, {
      // YOur Random Value...
      toValue: !showMenu ? -30 : 0,
      duration: 300,
      useNativeDriver: true
    })
      .start()

    setShowMenu(!showMenu);
  }
  return (
    <SafeAreaView className="justify-start items-start h-full bg-principal" >
      <View className="justify-start p-4">
        <View className="flex space-x-3 mt-8 justify-center items-center flex-row">
          <View className="bg-white p-1 rounded-full">
            <Image
            source={profile}
            className='w-[70px] rounded-full h-[70px]'
            resizeMode='contain'
           />
          </View>
          
          <View>
            <Text className="text-lg font-bold text-white">Jane DOE</Text>
            <TouchableOpacity>
              <Text className="mt-1 text-white">View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-8 ">
          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Search", search)}
          {TabButton(currentTab, setCurrentTab, "Notifications", notifications)}
          {TabButton(currentTab, setCurrentTab, "Settings", settings)}
        </View>
        <View className="mt-20 ml-1">
          {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
        </View>

      </View>

      <Animated.View className="flex-1 h-full bg-white absolute top-0 bottom-0 left-0 right-0"
        style={{
          borderRadius: showMenu ? 15 : 0,
          // Transforming View...
          transform: [
            { scale: scaleValue },
            { translateX: offsetValue }
          ]
        }}>
        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
          <Home 
            handleSwitch={switchMenu}
            showMenu={showMenu}
          />
        </Animated.View>

      </Animated.View>

    </SafeAreaView>
  );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
  return (
    <TouchableOpacity onPress={() => {
      if (title == "LogOut") {
        // Do your Stuff...
      } else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent',
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#8b33ff" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#8b33ff" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}













