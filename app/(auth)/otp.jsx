import React from 'react'
import { useState, useEffect, useRef } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import { images, icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import BottomSheet from "../../components/BottomSheet"
import { OtpInput } from "react-native-otp-entry";
import { sendCode } from '../../store/features/userSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Otp = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const [iscodevalid, setIscodevalid] = useState(false)
  const [isfilled, setIsFilled] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false);
  const user = useSelector(state => state.user);
  const [status, setStatus] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [viewHeight, setViewHeight] = useState(0);
  const handleOtpChange = (otp) => {
    setOtp(otp);
  };
  const bottomSheetRef = useRef(null);


  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
    console.log('Content Height:', viewHeight);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.scrollTo(-(height));
    }
  };

  const handleSendCode = async () => {
    console.log(isfilled);
    console.log(otp);
    if (isfilled) {
      setSubmitting(true);
      try {
        console.log('Ce que je t`\'envoie', otp);
        const data= {
           'code' : otp
        }
        const response = await dispatch(sendCode(data)).unwrap();
        console.log('Requête terminée');
        const info = response;
        console.log('Données reçues:', info);
        if (info.message == 'Verification passed') {
          setIscodevalid(true)
          openBottomSheet()
        }
        else if (info.message == 'Code invalid') {
          setIscodevalid(false)
          openBottomSheet()
        }
      }
      catch (error) {

      }
      finally {

      }
    } else {
      setSubmitting(false);
      Alert.alert('Erreur', 'Veuillez remplir le code')
    }
  };
  const openBottomSheet = () => {    
    console.log('j\'ouvre le bottom sheet'); // Scroll to a position, adjust as needed
    setStatus(true)
    bottomSheetRef.current.scrollTo(-viewHeight);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.scrollTo(0); // Scroll back to top position to close
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full bg-white w-full">
      <ScrollView className="h-full">
        <View className="w-full flex justify-center h-full px-4"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            className={`border border-gray-300 flex flex-row justify-center items-center w-[45px] h-[45px] rounded-full `}
          >
            <Image
              source={icons.leftArrow}
              resizeMode="contain"
              className="w-[18px] h-[12px]"
            />
          </TouchableOpacity>
          <View className="my-6 flex justify-center mx-auto flex-col ">
            <View className="w-36 h-36 flex justify-center mx-auto items-center rounded-full bg-[#EEEEEE] ">
              <View className="w-28 h-28 bg-principal flex justify-center items-center rounded-full">
                <Image
                  source={icons.lock}
                  resizeMode="contain"
                  className="w-12 h-12"
                />
              </View>
            </View>
            <Text className="mt-6 text-2xl text-center text-black font-pmedium  ">Verify code</Text>
            <Text className="font-plight text-center mt-6">Hi, Welcome back ! Please enter the code we just send to<Text className=" pl-2 font-pmedium"> {user.email} </Text></Text>
            <View className="mt-4 ">
              <OtpInput
                numberOfDigits={6}
                value={otp}
                onTextChange={handleOtpChange}
                onFilled={(value) => {
                  console.log(setIsFilled(value.length === 6 && /^\d+$/.test(value)));
                }}
                focusColor="#D142F5"
                focusStickBlinkingDuration={400}
                theme={{
                  pinCodeContainerStyle: {
                    width: 50,
                    height: 50,
                    lineHeight: 40,
                    fontSize: 16,
                    borderWidth: 2,
                    borderColor: '#0000',
                    borderRadius: 10,
                    backgroundColor: "#EEEEEE"
                  },
                }}
              />
            </View>
            <View className="my-8 " >
              <Text className="text-center font-plight mb-2">Didn't receive code ?</Text>
              <Text className="text-center text-principal underline font-plight">Resend Code</Text>
            </View>
            <View >
              <CustomButton
                title="Verify"
                handlePress={handleSendCode}
                containerStyles=" h-[56px] w-full"
                textStyles={"text-lg"}
                isLoading={user.isLoading}
              />
            </View>
          </View>

        </View>
      </ScrollView>
      {status &&
        <BottomSheet ref={bottomSheetRef} isVisible={isVisible}>
           <View onLayout={handleLayout} className="flex justify-center w-full  h-fit py-12 items-center flex-col mx-auto">
             <View className={`w-36 h-36 flex justify-center mx-auto items-center rounded-full ${iscodevalid ? 'bg-[#319F4333]' : 'bg-[#E3362933]'}`}>
            <View className={`w-28 h-28 ${iscodevalid ? 'bg-[#319F43B3]' : 'bg-[#E33629B3]'} flex justify-center items-center rounded-full`}>
              <Image
                source={iscodevalid ? icons.validpass : icons.invalidpass}
                resizeMode="contain"
                className="w-12 h-12"
              />
            </View>
          </View>
          <Text className="mt-6 text-xl text-center text-black font-pmedium ">{iscodevalid ? 'Verification Success !' : 'Verification failed !'}</Text>
          {!iscodevalid && <Text className="font-plight text-center my-6">Dear <Text className=" pl-2 font-pmedium">{user.email}</Text>, please enter the right code or ask to resend a new one.</Text>}
          {iscodevalid && <Text className="font-plight text-center my-6">Congratulation <Text className=" pl-2 font-pmedium">{user.email}</Text> You have successfully login into your account.</Text>}
          {!iscodevalid && <Pressable
            // onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-[#E33629B3] w-full rounded-full h-[56px] shadow-xl flex flex-row justify-center items-center`}

          >
            <Text className={`text-white text-lg text-center font-normal`}>
             Resend code
            </Text>
            {/* {isLoading && (
              <ActivityIndicator
                animating={isLoading}
                color="#fff"
                size="small"
                className="ml-2"
              />
            )} */}
          </Pressable>}
          {iscodevalid && 
          <Pressable
          onPress={() => {router.push("/home")} }
          activeOpacity={0.7}
          className={`bg-[#319F43B3] rounded-full w-full h-[56px] shadow-xl flex flex-row justify-center items-center`}

        >
          <Text className={`text-white text-lg text-center font-normal`}>
           Go to home
          </Text>
          {/* {isLoading && (
            <ActivityIndicator
              animating={isLoading}
              color="#fff"
              size="small"
              className="ml-2"
            />
          )} */}
          </Pressable>
          }
           </View>
         
        </BottomSheet>}
    </SafeAreaView>
    </GestureHandlerRootView>

    
  )
}
export default Otp