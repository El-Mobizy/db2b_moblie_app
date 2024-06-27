import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';

const BottomSheet = ({ children, setStatus }) => {
  const slide = useRef(new Animated.Value((400))).current;

  const slideUp = () => {
    // Slide up the bottom sheet
    Animated.timing(slide, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    // Slide down the bottom sheet
    Animated.timing(slide, {
      toValue: 600,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    slideUp();
  }, []);

  const closeModal = () => {
    slideDown();
    setTimeout(() => {
      setStatus(false);
    }, 1000);
  };

  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={{ width: '100%', height: '60%' }}>
        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
            <View className="bg-gray-300 h-1 rounded-md w-1/3 mx-auto"></View>
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </Pressable>
    </Pressable>
    
  );
};
export default BottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  bottomSheet: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  content: {
    marginTop: 20
  },
});
