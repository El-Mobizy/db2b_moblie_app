import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { images, icons } from "../constants";
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAllCategory } from '../store/features/categorySlice';

const CategoryCard = () => {
  useEffect(() => {
    // console.log('je suis aiu moins rentré');
    handleGetCategory()
  }, [dispatch]);
  const [selected, setSelected] = useState("");
  const [tags, setTags] = useState([])
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.category);
  const handleGetCategory = async () => {
    try {
      const response = await dispatch(getAllCategory()).unwrap();
      console.log('Requête terminée');
      const info = response.data;
      setTags(info)
    } catch (error) {
    } finally {
    }
  }
  return (
    <>
      {!isLoading &&
        (<View>
          <FlatList
            horizontal
            data={tags}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity className="w-[70px] mr-4" onPress={() => setSelected(item)}>
                  <View className={`${item === selected ? 'bg-principal' : 'bg-[#7910ff20]'} "w-full h-[70px] flex-row flex rounded-full justify-center items-center "`}>
                    <Image
                      source={{ uri: item.category_icone }}
                      resizeMode='contain'
                      className='w-[40px] h-[40px]'
                    />
                    {/* <Image source={item.category_icone} className={"w-30 h-30"} color={`${item === selected ? '#fff' : '#D142F5'}`} /> */}
                  </View>
                  <Text className={`${item === selected ? 'text-principal' : 'text-gray-500'} " text-center font-rmedium text-sm mt-2 "`}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
            contentContainerStyle={styles.container}
          />
        </View>)

      }

    </>
  );
}
export default CategoryCard

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});