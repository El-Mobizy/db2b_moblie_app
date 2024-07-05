import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomBottomSheet from '../../components/CustomBottomSheet';

const App = () => {
  const snapPoints = ['25%', '50%', '90%'];

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <Text>Awesome 🎉</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomBottomSheet snapPoints={snapPoints} renderContent={renderContent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
