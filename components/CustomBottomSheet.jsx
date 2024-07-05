import React, { useMemo, useRef, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const CustomBottomSheet = ({ snapPoints, renderContent }) => {
  const bottomSheetRef = useRef(null);

  const handleOpen = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  return (
    <GestureHandlerRootView>
         <View style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={handleOpen} />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        detach={true}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={(index) => console.log('Bottom Sheet state changed to', index)}
      >
        {renderContent()}
      </BottomSheet>
    </View>
    </GestureHandlerRootView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
});

export default CustomBottomSheet;








