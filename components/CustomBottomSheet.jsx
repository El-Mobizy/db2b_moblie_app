import React, { forwardRef, useImperativeHandle, useRef, useCallback, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

const CustomBottomSheet = forwardRef(({ snapPoints, children }, ref) => {
  const bottomSheetRef = useRef(null);
  const [backdropVisible, setBackdropVisible] = useState(false);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  useImperativeHandle(ref, () => ({
    openBottomSheet,
    closeBottomSheet,
  }));

  const CustomHandler = () => {
    return <View style={styles.customHandler} />;
  };

  const CustomBackground = () => {
    return <View style={styles.customBackground} />;
  };

  const CustomBackdrop = () => {
    return backdropVisible ? (
      <TouchableWithoutFeedback onPress={closeBottomSheet}>
        <View style={styles.customBackdrop} />
      </TouchableWithoutFeedback>
    ) : null;
  };

  const handleSheetChanges = useCallback((index) => {
    if (index > -1) {
      setBackdropVisible(true);
    } else {
      setBackdropVisible(false);
    }
  }, []);

  return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={CustomBackdrop}
        handleComponent={CustomHandler}
        onChange={handleSheetChanges}
      >
        <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: 24, justifyContent: 'center' }}>
          {children}
        </View>
      </BottomSheet>
  );
});

const styles = StyleSheet.create({
  customHandler: {
    height: 4,
    backgroundColor: '#00000066',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 16,
    width: '20%',
  },
  customBackground: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 1,
  },
  customBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000066',
  },
});

export default CustomBottomSheet;
