import React, { createContext, useContext, useRef, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

const BottomSheetContext = createContext();

export const BottomSheetProvider = ({ children, snapPoints }) => {
  const bottomSheetRef = useRef(null);
  const [backdropVisible, setBackdropVisible] = useState(false);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const CustomHandler = () => {
    return <View style={styles.customHandler}>
    </View>;
  };

  const CustomBackground = () => {
    return <View style={styles.customBackground} />;
  };

  const CustomBackdrop = () => {
    return backdropVisible ? <TouchableWithoutFeedback onPress={closeBottomSheet}>
    <View style={styles.customBackdrop} />
  </TouchableWithoutFeedback> : null;
  };

  const handleSheetChanges = useCallback((index) => {
    if (index > -1) {
      setBackdropVisible(true);
    } else {
      setBackdropVisible(false);
    }
  }, []);

  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {children}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          // backgroundComponent={CustomBackground}
          backdropComponent={CustomBackdrop}
          handleComponent={CustomHandler}
          onChange={handleSheetChanges}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Contenu du BottomSheet</Text>
            {/* Ajoutez plus de contenu ici si nécessaire */}
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = () => useContext(BottomSheetContext);

const styles = StyleSheet.create({
  customHandler: {
    height: 4,
    backgroundColor: '#00000066',
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 12,
    width: '20%'
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
