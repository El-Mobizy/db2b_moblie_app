// import React, { useCallback } from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { Dimensions, SafeAreaView, StyleSheet, View, Text } from 'react-native';
// import {
//   GestureHandlerRootView,
//   PanGestureHandler
// } from 'react-native-gesture-handler';
// import Animated, {
//   Extrapolate,
//   interpolate,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import { Feather } from '@expo/vector-icons';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// const THRESHOLD = SCREEN_WIDTH / 3;

// const App = () => {
//   const translateX = useSharedValue(0);

//   const panGestureEvent = useAnimatedGestureHandler({
//     onStart: (_, context) => {
//       context.x = translateX.value;
//     },
//     onActive: (event, context) => {
//       // I forgot to wrap the translationX with Math.max in the video :/
//       // It must be done in order to clamp the right axis scroll
//       translateX.value = Math.max(event.translationX + context.x, 0);
//     },
//     onEnd: () => {
//       if (translateX.value <= THRESHOLD) {
//         translateX.value = withTiming(0);
//       } else {
//         translateX.value = withTiming(SCREEN_WIDTH / 2);
//       }
//     },
//   });

//   const rStyle = useAnimatedStyle(() => {
//     const rotate = interpolate(
//       translateX.value,
//       [0, SCREEN_WIDTH / 2],
//       [0, 3],
//       Extrapolate.CLAMP
//     );

//     const borderRadius = interpolate(
//       translateX.value,
//       [0, SCREEN_WIDTH / 2],
//       [0, 15],
//       Extrapolate.CLAMP
//     );

//     return {
//       borderRadius,
//       transform: [
//         { perspective: 100 },
//         {
//           translateX: translateX.value,
//         },
//         {
//           rotateY: `-${rotate}deg`,
//         },
//       ],
//     };
//   });

//   const onPress = useCallback(() => {
//     if (translateX.value > 0) {
//       translateX.value = withTiming(0);
//     } else {
//       translateX.value = withTiming(SCREEN_WIDTH / 2);
//     }
//   }, []);

//   return (
//     <SafeAreaView style={[styles.container, styles.safe]}>
//       <View className=" bg-white m-10 ">
//           <Text className="text-white text-2xl">
//             ccccc
//           </Text>
//         </View>
//       <StatusBar style="inverted" />
//       <PanGestureHandler onGestureEvent={panGestureEvent}>
//         <Animated.View style={[{ backgroundColor: 'white', flex: 1 }, rStyle]}>
//           <Feather
//             name="menu"
//             size={32}
//             color={BACKGROUND_COLOR}
//             style={{ margin: 15, position: 'absolute' }}
//             onPress={onPress}
//           />
//         </Animated.View>
//       </PanGestureHandler>
//     </SafeAreaView>
//   );
// }

// export default () => {
//   return (
//     <GestureHandlerRootView
//       style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}
//     >
//       <App />
//     </GestureHandlerRootView>
//   );
// };

// const BACKGROUND_COLOR = '#1e1e23';
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: BACKGROUND_COLOR,
//   },
//   // safe: {
//   //   // workaround for the SafeAreaView in Android (use the react-native-safe-area-context package)
//   //   marginTop: Platform.OS === 'android' ? 30 : 0,
//   // },
// });


import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomBottomSheet from '../../components/CustomBottomSheet';

const App = () => {  
  const snapPoints = ['25%', '50%', '90%'];
  const [viewHeight, setViewHeight] = useState(0);
  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
    console.log('Content Height:', viewHeight);
    if (bottomSheetRef.current) {
        bottomSheetRef.current.scrollTo(-(height));
    }
};
  return (
    <View style={styles.container}>
      <CustomBottomSheet
        snapPoints={snapPoints} 
      >
        <View onLayout={handleLayout}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta eum ut ipsa laboriosam officia aperiam, consectetur consequatur doloremque eius placeat quibusdam qui labore cupiditate maiores modi minima eaque iste veritatis!
            Repellendus expedita beatae quia cupiditate quod recusandae quis, unde repellat ea debitis? Animi voluptates aliquid laudantium ullam nobis totam facilis maiores perferendis cum, beatae dolorem asperiores consequuntur quidem et quibusdam!
            Eaque, cum nihil asperiores eos ipsa quae labore necessitatibus fuga ea aliquid amet delectus culpa ipsam. Nihil nostrum ad, consequatur repellat sed eos ducimus illum aliquam ab, officia voluptatem placeat.
            Perspiciatis ea corporis deleniti veritatis sapiente porro earum consequatur recusandae quam atque et quos reiciendis dolores tempore dolorem fugit voluptates esse quod nesciunt, libero, hic nam officiis cupiditate. Cum, maxime?
          </Text>
        </View>
          
      </CustomBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;



// import React from 'react';
// import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, StatusBar } from 'react-native';
// import Colors from '../../constants/Colors';
// import MapList from '../../components/MapList';
// import images from '../../assets/images/images';
// import Icon, { Icons } from '../../components/Icons';
// import { headerPageText, subtitle1, subtitle2, title } from '../../constants/Constants';
// import LinearGradient from 'react-native-linear-gradient';
// import Animated, { Extrapolation, FadeIn, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
// import { useNavigation } from '@react-navigation/native';

// const { height: sHeight, width: sWidth } = Dimensions.get('screen');

// const ImageHeight = 280;

// const HeaderAnim1 = () => {
//   const navigation = useNavigation();
//   const scrollY = useSharedValue(0);

//   const handleScroll = useAnimatedScrollHandler((event) => {
//     scrollY.value = event.contentOffset.y;
//   });

//   const scrollAnimatedStyles = useAnimatedStyle(() => {
//     const translateY = interpolate(
//       scrollY.value,
//       [0, 320],
//       [0, -ImageHeight],
//       Extrapolation.CLAMP,
//     );
//     return { transform: [{ translateY }] };
//   });

//   const headerViewAnimatedStyles = useAnimatedStyle(() => {
//     const backgroundColor = interpolateColor(
//       scrollY.value,
//       [0, 320],
//       ['transparent', Colors.darkGray],
//     );
//     return { backgroundColor };
//   });

//   const titleAnimatedStyles = (fadeIn) => useAnimatedStyle(() => {
//     const outputRange = fadeIn ? [0, 0, 1] : [1, 0, 0];
//     const opacity = interpolate(
//       scrollY.value,
//       [0, 120, 320],
//       outputRange,
//     );
//     return { opacity };
//   });

//   const animatedImageStyles = useAnimatedStyle(() => {
//     const scale = interpolate(
//       scrollY.value,
//       [0, 320],
//       [1.4, 1],
//       { extrapolateRight: Extrapolation.CLAMP },
//     );
//     return { transform: [{ scale }] };
//   });

//   return (
//     <View style={styles.container}>
//       <StatusBar translucent backgroundColor={'transparent'} />
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Icon type={Icons.Feather} name="chevron-left" color={Colors.white} />
//       </TouchableOpacity>
//       <Animated.View style={[styles.headerImage, animatedImageStyles]}>
//         <Image source={images.headerImg} resizeMode='contain' style={{ width: sWidth, zIndex: -1 }} />
//         <LinearGradient colors={['transparent', 'transparent', Colors.black]} style={styles.imageOverlay} />
//       </Animated.View>
//       <Animated.View style={scrollAnimatedStyles}>
//         <Animated.View style={[styles.headerView, headerViewAnimatedStyles]}>
//           <View>
//             <Animated.Text style={[styles.title, titleAnimatedStyles(false)]}>{title}</Animated.Text>
//             <Animated.Text style={[styles.title2, titleAnimatedStyles(true)]}>{title}</Animated.Text>
//           </View>
//         </Animated.View>
//         <Animated.ScrollView
//           onScroll={handleScroll}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 120 }}
//           style={{ backgroundColor: Colors.black, zIndex: 99 }}>
//           <View style={styles.innerContainer}>
//             <Text style={styles.text}>{subtitle1}</Text>
//             <Text style={styles.text2}>{subtitle2}</Text>
//             <ScrollView horizontal style={{ paddingVertical: 30 }}>
//               <MapList fragment data={[1, 2, 3, 4, 5, 6]}
//                 renderItem={(item, index) => (
//                   <Animated.View key={index}
//                     entering={FadeIn.duration(400).delay(index * 300)}
//                     style={styles.listItem} />
//                 )} />
//             </ScrollView>
//             <View>
//               <Text style={styles.description}>{headerPageText}</Text>
//             </View>
//             <ScrollView horizontal style={{ paddingVertical: 30 }}>
//               <MapList fragment data={[1, 2, 3, 4, 5, 6]}
//                 renderItem={(item, index) => (
//                   <Animated.View key={index}
//                     entering={FadeIn.duration(400).delay(index * 300)}
//                     style={styles.listItem} />
//                 )} />
//             </ScrollView>
//             <View>
//               <Text style={styles.description}>{headerPageText}</Text>
//               <Text style={[styles.description, { marginTop: 30 }]}>{headerPageText}</Text>
//             </View>
//           </View>
//         </Animated.ScrollView>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.black,
//   },
//   headerImage: {
//     width: '100%',
//     height: ImageHeight,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: Colors.gray + '30',
//     zIndex: 9999,
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerView: {
//     width: '100%',
//     justifyContent: 'center',
//     paddingVertical: 12,
//   },
//   title: {
//     fontSize: 38,
//     fontWeight: '600',
//     color: Colors.orange,
//     marginHorizontal: 20,
//     position: 'absolute',
//   },
//   title2: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: Colors.orange,
//     marginHorizontal: 20,
//     textAlign: 'center',
//     marginTop: 34,
//   },
//   innerContainer: {
//     margin: 20,
//   },
//   listItem: {
//     width: 100,
//     height: 100,
//     borderRadius: 14,
//     backgroundColor: Colors.darkGray,
//     marginRight: 16,
//   },
//   text: {
//     fontSize: 20,
//     color: Colors.gray,
//     fontWeight: '600',
//   },
//   text2: {
//     fontSize: 16,
//     color: Colors.orange,
//     marginTop: 10,
//     fontWeight: '600',
//   },
//   description: {
//     fontSize: 16,
//     color: Colors.gray,
//     textAlign: 'justify',
//   },
//   imageOverlay: {
//     height: ImageHeight + 50,
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default HeaderAnim1;
