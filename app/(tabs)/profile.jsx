import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BottomSheetProvider, useBottomSheet } from '../../components/CustomBottomSheet';

const ChildComponent = () => {
  const { openBottomSheet } = useBottomSheet();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Component</Text>
      <Button title="Open Bottom Sheet" onPress={openBottomSheet} />
    </View>
  );
};

const App = () => {
  return (
    <BottomSheetProvider snapPoints={['25%', '50%', '75%']}>
      <View style={styles.container}>
        <Text style={styles.title}>Parent Component</Text>
        <ChildComponent />
      </View>
    </BottomSheetProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
