import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Checkbox = ({ label, onChange, isChecked }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onChange}
      activeOpacity={0.8}
    >
      <View style={styles.checkboxContainer}>
        {isChecked ? (
          <Ionicons name="checkbox" size={24} color="#D142F5"/>
        ) : (
          <Ionicons name="square-outline" size={24} color="#D142F5"/>
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
//   checkboxContainer: {
//     marginRight: 5,
//   },
  label: {
    fontSize: 18,
  },
});

export default Checkbox;
