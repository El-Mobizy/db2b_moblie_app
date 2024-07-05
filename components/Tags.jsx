import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
const COLORS = {principal: '#7910ff'}
const Tags = () => {
  const tags = ['Trending', 'Classic', 'Mode']
  // const [tags, setTags] = useState([]);
  const [selected, setSelected] = useState("Trending");
  const { data , isLoading } = useSelector(state => state.category);
  useEffect(() => {
    if (!isLoading) {
      // setTags(data)
      // console.log('je suis dedans' , data);
    }
  }, [data, isLoading]);
  return (
    <>
      {!isLoading && 
     ( <View style={styles.container}>
        <FlatList
          horizontal
          data={tags}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => setSelected(item)}>
                <Text
                  className="font-rmedium text-sm rounded-full py-2 mr-2.5 px-8 bg-[#7910ff20] text-principal "
                  style={[
                    styles.tagText,
                    
                    item == selected ? styles.isSelected : null,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.container}
        />
      </View>)
      }
    </>


  );
};

export default Tags;

const styles = StyleSheet.create({
  isSelected: {
    backgroundColor: COLORS.principal,
    color: "#FFFFFF",
  },
  container: {
    marginVertical: 5,
  },
});
