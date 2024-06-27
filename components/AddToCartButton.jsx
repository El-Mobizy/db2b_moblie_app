import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const AddToCartButton = ({ price }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.price}>Price: {price}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#D142F5',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddToCartButton;
