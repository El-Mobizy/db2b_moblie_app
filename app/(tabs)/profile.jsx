import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import CustomBottomSheet from '../../components/CustomBottomSheet';

const App = () => {
  const [viewHeight, setViewHeight] = useState(0);

  const bottomSheetRef = useRef(null);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current.openBottomSheet();
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current.closeBottomSheet();
  };
  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
    console.log('Content Height:', viewHeight);
   
  
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        <Text>App Content Here</Text>
        <Button title="Open BottomSheet" onPress={handleOpenBottomSheet} />
        <CustomBottomSheet ref={bottomSheetRef} snapPoints={viewHeight > 0 ? [viewHeight, '50%', '75%'] : ['25%', '50%', '75%']}>
          <View onLayout={handleLayout} style={{ padding: 20 }}>
            <Text>Content inside BottomSheet</Text>
            <Button title="Close BottomSheet" onPress={handleCloseBottomSheet} />
          </View>
        </CustomBottomSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
