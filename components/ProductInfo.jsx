import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AddToCartButton from './AddToCartButton';

const ProductInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.category}>Category</Text>
          <Text style={styles.subCategory}>Sub-Category</Text>
        </View>
        <Text style={styles.rating}>⭐ 5.0</Text>
      </View>
      <Text style={styles.title}>Men's Jacket</Text>
      <Text style={styles.details}>
        A men's jacket is a versatile outerwear garment designed to provide warmth, style, and protection. Typically featuring a front opening with buttons...
      </Text>
      <TouchableOpacity>
        <Text style={styles.readMore}>Read more</Text>
      </TouchableOpacity>
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorLabel}>Select size: XL</Text>
        <View style={styles.sizes}>
          {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
            <Text key={size} style={styles.size}>{size}</Text>
          ))}
        </View>
      </View>
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorLabel}>Select color: red</Text>
        <View style={styles.colors}>
          {['#FF6347', '#FFC0CB', '#FFD700', '#32CD32', '#1E90FF'].map((color) => (
            <View key={color} style={[styles.color, { backgroundColor: color }]} />
          ))}
        </View>
      </View>
      <Text style={styles.weight}>Weight: 1 pound</Text>
      <AddToCartButton price="XOF 10.000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subCategory: {
    fontSize: 14,
    color: 'gray',
  },
  rating: {
    fontSize: 20,
    color: 'gold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  details: {
    fontSize: 16,
    marginTop: 10,
  },
  readMore: {
    color: '#D142F5',
    marginTop: 5,
  },
  selectorContainer: {
    marginTop: 20,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sizes: {
    flexDirection: 'row',
    marginTop: 10,
  },
  size: {
    backgroundColor: '#EEEEEE',
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  colors: {
    flexDirection: 'row',
    marginTop: 10,
  },
  color: {
    width: 30,
    height: 30,
    marginRight: 5,
    borderRadius: 15,
  },
  weight: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default ProductInfo;
