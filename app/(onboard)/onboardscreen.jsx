import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { CustomButton } from "../../components";
import { images, icons } from "../../constants";
import { router, Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#374151', secondary: '#6B7280', principal: '#7910ff', white: '#fff' };

const slides = [
  {
    id: '1',
    image: images.welcome1,
    title: `A<Text> fluid interface</Text> for a unique shopping experience`,
    subtitle: 'The pages have been carefully designed to move you into action.',
  },
  {
    id: '2',
    image: images.welcome1,
    title: 'Add your<Text className="ml-2"> favorite products</Text> to the list of favorites ',
    subtitle: 'Fill your favourites with the products you like so you don\'t lose sight of them.',
  },
  {
    id: '3',
    image: images.welcome1,
    title: ' An express<Text className="ml-2"> delivery service</Text> at your disposal ',
    subtitle: 'Our delivery service reduces the distance between you and your seller.',
  },
];

const Slide = ({ item }) => {
  return (
    <View className="items-center h-full">
      <Image
        source={item?.image}
        className="mt-12 mx-[7.5vw] w-[85vw] "
        resizeMode='contain'
      />

    </View>
  );
};

const onboardscreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        className="rounded-t-3xl"
        style={{
          height: height * 0.35,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          position: 'absolute',
          bottom: 0, 
          width: '100%',
          backgroundColor: '#fff',
        }}>

        {/* Indicator container */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            {/* Render indicator */}
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex === index && {
                    backgroundColor: COLORS.principal,
                    width: 25,
                  },
                ]}
              />
            ))}
          </View>

          {/* Render title and subtitle */}
          <View className=" w-full items-center">
          <Text className="font-rbold" style={styles.title}>
          {slides[currentSlideIndex].title.split('<Text')[0]}
          <Text className="text-principal">
            {slides[currentSlideIndex].title.split('>')[1].split('<')[0]}
          </Text>
          {slides[currentSlideIndex].title.split('</Text>')[1]}
        </Text>
            <Text className="font-rregular" style={styles.subtitle}>{slides[currentSlideIndex].subtitle}</Text>
          </View>
        </View>
        {/* Render buttons */}
        <View style={{ marginVertical: 20}}>
          {currentSlideIndex == slides.length - 1 ? (
            <CustomButton
            title="CONTINUE"
            handlePress={() => router.push("/forgotPassword")}
            containerStyles="w-full mb-7 min-h-[50px]"
            textStyles={"text-base font-rbold"}
          />
            // <View style={{ height: 50 }}>
            //   <TouchableOpacity
            //     style={styles.btn}
            //     onPress={() => router.replace('otp')}>
            //     <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
            //       GET STARTED
            //     </Text>
            //   </TouchableOpacity>
            // </View>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.btn,
                  {
                    borderColor: COLORS.principal,
                    borderWidth: 1,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={skip}>
                <Text
                className="text-[15px] font-rbold"
                  style={{
                    color: COLORS.principal,
                  }}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    color: COLORS.white
                  }}>
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#D9D9D9" }}>
      <StatusBar backgroundColor={COLORS.primary} />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{ height: height * 0.85 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer
      />
    </SafeAreaView>
  );
};
export default onboardscreen;

const styles = StyleSheet.create({
  subtitle: {
    color: COLORS.secondary,
    fontSize: 15,
    marginTop: 20,
    maxWidth: '90%',
    textAlign: 'center',
    lineHeight: 23,
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    marginTop: 20,
    textAlign: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: COLORS.principal,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


