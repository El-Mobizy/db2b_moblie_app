import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';

const images = [
  { uri: 'https://via.placeholder.com/300x300.png?text=Image+1' },
  { uri: 'https://via.placeholder.com/300x300.png?text=Image+2' },
  { uri: 'https://via.placeholder.com/300x300.png?text=Image+3' },
];

const ProductImageCarousel = () => {
  return (
    <ScrollView horizontal pagingEnabled style={styles.carousel}>
      {images.map((image, index) => (
        <Image key={index} source={{ uri: image.uri }} style={styles.image} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carousel: {
    height: 300,
  },
  image: {
    width: 300,
    height: '100%',
    resizeMode: 'cover',
    margin: 5,
  },
});

export default ProductImageCarousel;
