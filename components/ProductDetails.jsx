import React from 'react';
import { View, StyleSheet, Dimensions, Text, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate } from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import ProductImageCarousel from './ProductImageCarousel';
import ProductInfo from './ProductInfo';
const { height } = Dimensions.get('window');

const ProductDetails = () => {
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const onGestureEvent = (event) => {
    translateY.value = event.translationY;
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === 5) {
      if (translateY.value > height / 3) {
        translateY.value = withSpring(height - 100);
      } else {
        translateY.value = withSpring(0);
      }
    }
  };

  return (
    <GestureHandlerRootView className="w-full bg-white justify-center   items-center flex h-full">
      <View style={styles.container}>
      <ProductImageCarousel />
      <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.productDetails, animatedStyle]}>
          <ProductInfo />
        </Animated.View>
      </PanGestureHandler>
    </View>
    </GestureHandlerRootView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productDetails: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height - 100,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

export default ProductDetails;
