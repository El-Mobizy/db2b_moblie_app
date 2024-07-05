import { StatusBar } from "expo-status-bar";
import { Redirect, Link, router } from "expo-router";
import { View, Text, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
// import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="bg-white h-full">
      {/* <Loader isLoading={loading} /> */}

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="bg-white w-[95%] h-[50vh] flex flex-row justify-between items-center ">
            <Image
              source={images.man3D}
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* <Image
              source={images.welcome1}
              className="w-[49%] rounded-[78px] h-full"
              resizeMode="cover"
            />
            <View className=" flex justify-between h-[50vh] w-[49%]">
              <Image
                source={images.welcome2}
                className="w-full h-[59%] rounded-full "
                resizeMode="cover"
              />

              <Image
                source={images.welcome3}
                className="w-full rounded-full h-[40%]"
                resizeMode="cover"
              />
            </View> */}

          </View>
          <View className="w-full mt-8 ">
            <Text className="text-2xl text-gray-700 font-rbold text-center">
              Your <Text className="text-principal">best companion</Text> for everyday purchasing !
            </Text>

            <Text className=" text-gray-500 mt-7 text-sm font-rregular text-center">
            Shop everything directly from your smartphone without the hassle.
                    </Text>

            <CustomButton
              title="GET'S STARTED"
              handlePress={() => router.push("/onboardscreen")}
              containerStyles="w-full my-7 min-h-[50px]"
              textStyles={"text-base font-rbold"}
            />
            <View className="flex items-center justify-center flex-row gap-2">
              <Text className="text-sm text-gray-500 font-rregular">
              Already have an account ?
              </Text>
              <Link
                href="/auth"
                className="text-sm font-rregular underline text-principal"
              >
                Log in
              </Link>
            </View>
          </View>

        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};
export default Welcome;
