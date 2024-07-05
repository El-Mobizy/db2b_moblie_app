import React, { useCallback, useImperativeHandle, useEffect, forwardRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { GestureDetector, GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = forwardRef(({ children , isVisible }, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination) => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);

  const isActive = useCallback(() => active.value, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [scrollTo, isActive]);
  useEffect(() => {
    if (isVisible) {
      scrollTo(-SCREEN_HEIGHT); // Will be updated from the parent
    } else {
      scrollTo(SCREEN_HEIGHT);
    }
  }, [isVisible]);

  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      if (event.translationY > 0) {
         translateY.value = Math.max(event.translationY + context.value.y, MAX_TRANSLATE_Y);
      }
    }) 
    .onEnd(() => {
      // if (translateY.value > -SCREEN_HEIGHT / 3) {
      //   scrollTo(0);
      // } 
      // else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
      //   scrollTo(MAX_TRANSLATE_Y);
      // }
        if (translateY.value > -SCREEN_HEIGHT / 3) {
          // Si glissé vers le bas suffisamment, le BottomSheet se ferme
          scrollTo(0);

        } 
        else {
          // Dans tous les autres cas, y compris glissé vers le haut, il revient à sa position initiale
          scrollTo(context.value.y);
        }
    });

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ translateY: translateY.value }],
    };
  });

  const rBackdropStyle = useAnimatedStyle(() => ({
    opacity: withTiming(active.value ? 1 : 0),
  }));

  const rBackdropProps = useAnimatedProps(() => ({
    pointerEvents: active.value ? 'auto' : 'none',
  }));

  return (
    <>
      <Animated.View
        animatedProps={rBackdropProps}
        style={[styles.backdrop, rBackdropStyle]}
        onTouchStart={() => scrollTo(0)}
      />
      <GestureDetector  gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
          <View style={styles.line} />
          <View className=" px-4">
             {children}
          </View>
           
        </Animated.View>
      </GestureDetector>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheetContainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT -15,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;

