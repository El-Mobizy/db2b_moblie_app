import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import { router, Link } from 'expo-router';
import { StyleSheet, Dimensions, TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const COLORS = {principal: '#7910ff'}
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

const { width, height } = Dimensions.get('screen');

export default function CartComponent() {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
    ],
  }));

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = width / 2 - 50;
      const bottomNavigationHeight = 70;
      const buttonHeight = 60;
      
      const minTranslateY = -height / 2 + buttonHeight; 
      const maxTranslateY = height / 2 - bottomNavigationHeight - buttonHeight; 

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        minTranslateY,
        maxTranslateY
      );
    })
    .runOnJS(true);
  return (
      <GestureDetector gesture={pan}>
        <Animated.View style={[animatedStyles, styles.button]}>
          <TouchableOpacity
          onPress={() => router.push("/cart")}
          activeOpacity={0.7}
          >
            <Icon name="cart" size={30} color="#fff" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>5</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.principal,
    position: 'absolute',
    zIndex: 50,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    backgroundColor: 'red',
    position: 'absolute',
    right: -1,
    top: -1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  notificationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

