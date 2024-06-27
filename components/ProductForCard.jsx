import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import { images, icons } from "../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import Checkbox from './Checkbox';
import { AntDesign } from '@expo/vector-icons';
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

const ProductForCard = () => {
    const ICON_SIZE = 15;
    const BUTTON_WIDTH = 100;
    const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;

    const clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    };

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
    const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

    return (
        <View className="flex space-x-3 flex-row w-full items-center py-2">
            <Checkbox
                isChecked={isChecked}
                onChange={handleCheckboxChange}
            />
            <View className="flex bg-white items-center space-x-2 flex-row ">
                <Image
                    className='w-20 h-20 rounded-2xl'
                    source={images.welcome2}
                />
                <View className="h-[55px] flex-col justify-between flex ">
                    <Text className="font-light text-sm">
                        Men’s Jacket
                    </Text>
                    <Text className="text-base mt-1 text-black font-psemibold">
                        XOF 10.000
                    </Text>
                </View>
            </View>
            <GestureHandlerRootView >
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={[styles.button, rButtonStyle]}>
                        <TouchableOpacity className="p-2" onPress={decrementCount}>
                            <Animated.View style={rPlusMinusIconStyle}>
                                <Text className="text-xl text-[#D142F5] font-pmedium">-</Text>
                            </Animated.View>
                        </TouchableOpacity>
                        <Animated.View style={rCloseIconStyle}>
                            <AntDesign name="close" color={'black'} size={ICON_SIZE} />
                        </Animated.View>
                        <TouchableOpacity className="p-2 " onPress={incrementCount}>
                            <Animated.View style={rPlusMinusIconStyle} on>
                                <Text className="text-xl text-[#D142F5] font-pmedium">+</Text>
                            </Animated.View>
                        </TouchableOpacity>
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
        </View>
    )
}
export default ProductForCard

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 100,
        backgroundColor: '#d142f525',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    countText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
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
