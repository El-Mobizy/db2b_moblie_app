import { AntDesign } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const ICON_SIZE = 15;
const BUTTON_WIDTH = 100;
const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

const SlidingCounter = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount((currentCount) => currentCount + 1);
  }, []);

  const decrementCount = useCallback(() => {
    setCount((currentCount) => currentCount - 1);
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = clamp(
        event.translationX,
        -MAX_SLIDE_OFFSET,
        MAX_SLIDE_OFFSET
      );
      translateY.value = clamp(event.translationY, 0, MAX_SLIDE_OFFSET);
    })
    .onEnd(() => {
      if (translateX.value === MAX_SLIDE_OFFSET) {
        runOnJS(incrementCount)();
      } else if (translateX.value === -MAX_SLIDE_OFFSET) {
        runOnJS(decrementCount)();
      } else if (translateY.value === MAX_SLIDE_OFFSET) {
        runOnJS(resetCount)();
      }

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    })
    .runOnJS(true);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  }, []);

  const rPlusMinusIconStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 0.8, 0.4]
    );

    const opacityY = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [1, 0]
    );

    return {
      opacity: opacityX * opacityY,
    };
  }, []);

  const rCloseIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [0, 0.8]
    );

    return {
      opacity,
    };
  }, []);

  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value * 0.1,
        },
        { translateY: translateY.value * 0.1 },
      ],
    };
  }, []);

  return (
    <GestureHandlerRootView >
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.button, rButtonStyle]}>
            <Animated.View style={rPlusMinusIconStyle}>
              <AntDesign name="minus" color={'white'} size={ICON_SIZE} />
            </Animated.View>
            <Animated.View style={rCloseIconStyle}>
              <AntDesign name="close" color={'white'} size={ICON_SIZE} />
            </Animated.View>
            <Animated.View style={rPlusMinusIconStyle}>
              <AntDesign name="plus" color={'blacky'} size={ICON_SIZE} />
            </Animated.View>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Animated.View style={[styles.circle, rStyle]}>
                <Text style={styles.countText}>{count}</Text>
              </Animated.View>
            </View>
          </Animated.View>
        </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  button: {
    height: 40,
    backgroundColor: '#d142f525',
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  countText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'semibold'
  },
  circle: {
    height: 35,
    width: 35,
    backgroundColor: '#D142F5',
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
