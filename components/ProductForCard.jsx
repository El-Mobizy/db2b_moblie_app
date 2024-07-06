import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, ImageBackground, TouchableOpacity } from 'react-native'
import { images, icons } from "../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import Checkbox from './Checkbox';
import { AntDesign } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
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
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/features/productSlice';
const ProductForCard = ({ item, ondelete }) => {
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(incrementQuantity(item.ad_id));  
    };

    const handleDecrement = () => {
        if (item.quantity > 1) {
            dispatch(decrementQuantity(item.ad_id));  
        }
    };  
    const handleReset = () => {
        if (item.quantity > 1) {
            dispatch(decrementQuantity(item.ad_id));
        }
    };
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
                runOnJS(handleIncrement)();
            } else if (translateX.value === -MAX_SLIDE_OFFSET) {
                runOnJS(handleDecrement)();
            } else if (translateY.value === MAX_SLIDE_OFFSET) {
                runOnJS(handleReset)();
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
    const renderRightActions = () => (
        <View className="bg-red-500 justify-center items-center h-full w-20" >
            <TouchableOpacity activeOpacity={1} onPress={() => ondelete(item.ad_id)} className="p-4">
                <AntDesign name="delete" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
    return (
        <GestureHandlerRootView className="w-full py-2">
            <Swipeable renderRightActions={renderRightActions}>
                <View className="flex bg-white space-x-2 flex-row w-full items-center ">
                    <Checkbox
                        color='#7910ff'
                        isChecked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <View className="flex bg-white items-center space-x-2 flex-row ">
                        <Image
                            className='w-[70px] h-[70px] rounded-2xl'
                            source={{ uri: item.image }}
                        />
                        <View className=" flex-col justify-between flex ">
                            <Text className="font-rlight text-sm">
                                {item.ad_title}
                            </Text>
                            <Text className="text-base mt-1 text-black font-rmedium">
                                XOF {item.final_price}
                            </Text>
                            <View className="flex flex-row space-x-2">
                                <View className="flex border-r pr-2 flex-row space-x-1 justify-center items-center">
                                    <Text className="font-rlight">Size:</Text>
                                    <Text className="font-rmedium">L</Text>
                                </View>
                                <View className="flex flex-row space-x-1 justify-center items-center">
                                    <Text className="font-rlight">Color:</Text>
                                    <View className="w-3 h-3 rounded-full" style={{ backgroundColor: "#7910ff" }}></View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <GestureHandlerRootView >
                        <GestureDetector gesture={panGesture}>
                            <Animated.View style={[styles.button, rButtonStyle]}>
                                <TouchableOpacity className="px-2" onPress={handleDecrement}>
                                    <Animated.View style={rPlusMinusIconStyle}>
                                        <Text className="text-2xl text-principal font-rmedium">-</Text>
                                    </Animated.View>
                                </TouchableOpacity>
                                <Animated.View style={rCloseIconStyle}>
                                    <AntDesign name="close" color={'black'} size={ICON_SIZE} />
                                </Animated.View>
                                <TouchableOpacity className="px-2" onPress={handleIncrement}>
                                    <Animated.View style={rPlusMinusIconStyle} on>
                                        <Text className="text-2xl text-principal font-rmedium">+</Text>
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
                                        <Text style={styles.countText}>{item.quantity}</Text>
                                    </Animated.View>
                                </View>
                            </Animated.View>
                        </GestureDetector>
                    </GestureHandlerRootView>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}
export default ProductForCard

const styles = StyleSheet.create({
    button: {
        height: 45,
        width: 100,
        backgroundColor: '#7910ff20',
        borderRadius: 5,
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
        height: 30,
        width: 30,
        backgroundColor: '#7910ff',
        borderRadius: 5,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
});








