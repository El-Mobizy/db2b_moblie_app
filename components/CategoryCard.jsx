import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { images, icons } from "../constants";
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAllCategory, setActiveCategory } from '../store/features/categorySlice';

const CategoryCard = () => {
  useEffect(() => {
    // console.log('je suis aiu moins rentré');
    handleGetCategory()
  }, [dispatch]);
  const [isSubmitting, setSubmitting] = useState(false); 
  const { category, isLoading } = useSelector(state => state.category)
  const first = category[0]
  const [selected, setSelected] = useState(first);
  const dispatch = useDispatch();
  const handleGetCategory = async () => {
    setSubmitting(true)
    try {
      const response = await dispatch(getAllCategory()).unwrap().then(setSubmitting(false));
    } catch (error) {
      setSubmitting(false)
    } finally {
    }
  }
  return (
    <>
      {!isSubmitting &&
        (<View>
          <FlatList
            horizontal
            data={category}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity className="w-[70px] mr-4" onPress={() => dispatch(setActiveCategory(item))}>
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