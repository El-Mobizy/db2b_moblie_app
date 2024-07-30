import React from 'react'
import { useState, useEffect, useRef, useCallback } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import { images, icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import CustomBottomSheet from "../../components/CustomBottomSheet";
import PageTitle from '../../components/PageTitle';
import { OtpInput } from "react-native-otp-entry";
import { getNewCode, sendCode } from '../../store/features/userSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Modal from '../../components/Modal';
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
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const openModal = () => {
    modalRef.current.handleOpenModal();
  };
  const closeModal = () => {
    modalRef.current.handleCloseModal();
  };
  const handleOtpChange = (otp) => {
    setOtp(otp);
  };
  const bottomSheetRef = useRef(null);
  const modalRef = useRef(null);
  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };
//   useEffect(() => {
//     if (bottomSheetRef.current) {
//         bottomSheetRef.current.scrollTo(-(viewHeight + 20));
//       }
// }, [viewHeight]);
  const handleSendCode = async () => {
    console.log(isfilled);
    console.log(otp);
    if (isfilled) {
      setSubmitting(true);
      openModal()
      try {
        console.log('Ce que je t`\'envoie', otp);
        const data = {
           'code' : otp
        }
        const response = await dispatch(sendCode(data)).unwrap();
        console.log('Requête terminée');
        const info = response;
        console.log('Données reçues:', info);
        if (info.message == 'Verification passed') {
          closeModal()
          setSubmitting(false);
          setIscodevalid(true)
          handleOpenBottomSheet()
          setTimeout(() => {
            router.replace('/home')
          }, 1000);
        }
        else if (info.message == 'Code invalid') {
          closeModal()
          setSubmitting(false)
          setIscodevalid(false)
          handleOpenBottomSheet()
        }
      }
      catch (error) {
        closeModal()
        setSubmitting(false)
        setTitle("Error !")
        setMessage(error)
      }
      finally {

      }
    } else {
      setSubmitting(false);
      Alert.alert('Erreur', 'Veuillez remplir le code')
    }
  };
  const handleGetNewCode = async () => {
    if (bottomSheetRef.current) {
      handleCloseBottomSheet()
    }
    console.log('dans la fonction deja');
      setSubmitting(true);
      console.log('apres le setSubmitting');
      openModal()
      console.log('apres le openModal');
      try {
        const response = await dispatch(getNewCode(user.userId)).unwrap();
        console.log('Requête terminée');
        const info = response;
        console.log('Données reçues:', info);
        if (info.message == 'code sent successfully !') {
          setSubmitting(false);
          setTitle('Success !')
          setMessage(info.message)
          setTimeout(() => {
            router.replace('/home')
          }, 1000);
        }
        else if (info.message != 'code sent successfully !') {
          setSubmitting(false)
          setTitle('Error !')
          setMessage(info.message)
        }
      }
      catch (error) {
        setSubmitting(false)
        setTitle("Error !")
        setMessage(error)
      }
      finally {

      }
    } 
  const handleOpenBottomSheet = () => {
    console.log('Ouverture');
    bottomSheetRef.current.openBottomSheet();
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current.closeBottomSheet();
  };
 
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full bg-white w-full">         
        <PageTitle  />
      <ScrollView className="h-full">
        <View className="w-full flex justify-center h-full px-4"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
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
            <Text className="mt-6 text-2xl text-center text-black font-rmedium">Verify code</Text>
            <Text className="font-rregular text-base text-center mt-6">Hi, Welcome back ! Please enter the code we just send to<Text className=" pl-2 font-rmedium"> {user.email} </Text></Text>
            <View className="mt-4 ">
              <OtpInput
                numberOfDigits={6}
                value={otp}
                onTextChange={handleOtpChange}
                onFilled={(value) => {
                  console.log(setIsFilled(value.length === 6 && /^\d+$/.test(value)));
                }}
                focusColor="#7910ff"
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
              <Text className="text-center text-base font-rregular mb-2">Didn't receive code ?</Text>
              <TouchableOpacity onPress={handleGetNewCode}>
                  <Text className="text-center text-base text-principal underline font-rregular">Resend Code</Text>
              </TouchableOpacity>
            </View>
            <View >
              <CustomButton
                title="Verify"
                handlePress={handleSendCode}
                containerStyles=" h-[50px] w-full"
                textStyles={"text-lg font-rmedium"}
                // isLoading={user.isLoading}
              />
            </View>
          </View>
        </View>
      </ScrollView>
        <CustomBottomSheet ref={bottomSheetRef} snapPoints={viewHeight > 0 ? [viewHeight] : ['25%', '50%', '75%']}>
           <View onLayout={handleLayout} className="flex justify-center w-full  h-fit py-12 items-center flex-col mx-auto">
             <View className={`w-32 h-32 flex justify-center mx-auto items-center rounded-full ${iscodevalid ? 'bg-[#319F4333]' : 'bg-[#E3362933]'}`}>
            <View className={`w-24 h-24 ${iscodevalid ? 'bg-[#319F43B3]' : 'bg-[#E33629B3]'} flex justify-center items-center rounded-full`}>
              <Image
                source={iscodevalid ? icons.validpass : icons.invalidpass}
                resizeMode="contain"
                className="w-10 h-10"
              />
            </View>
          </View>
          <Text className="mt-7 text-2xl text-center text-black font-rmedium ">{iscodevalid ? 'Verification Success !' : 'Verification failed !'}</Text>
          {!iscodevalid && <Text className="font-rregular text-base text-center my-6">Dear <Text className=" pl-2 font-rmedium">{user.email}</Text>, please enter the right code or ask to resend a new one.</Text>}
          {iscodevalid && <Text className="font-rlight text-base text-center my-6">Congratulation <Text className=" pl-2 font-rmedium">{user.email}</Text> You have successfully login into your account.</Text>}
          {!iscodevalid && <TouchableOpacity
            onPress={handleGetNewCode}
            activeOpacity={0.85}
            className={`bg-[#E33629B3] w-full rounded-full h-[50px] shadow-xl flex flex-row justify-center items-center`}
          >
            <Text className={`text-white font-rmedium text-lg text-center font-normal`}>
             Resend code
            </Text>
          </TouchableOpacity>}
          {iscodevalid && 
          <Pressable
          onPress={() => {router.push("/home")} }
          activeOpacity={0.85}
          className={`bg-[#319F43B3] rounded-full w-full h-[50px] shadow-xl flex flex-row justify-center items-center`}
        >
          <Text className={`text-white font-rmedium text-lg text-center font-normal`}>
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
         
        </CustomBottomSheet>
       <Modal isLoading={isSubmitting} ref={modalRef}>
        <View className="flex items-center">
          <Text className="text-xl text-center font-rmedium mb-4 text-black">{title}</Text>
          <Image
            source={`${title === "Success !" ? images.success : images.error}`}
            resizeMode='contain'
            className={`${title != "Success !" ? 'w-[100px] h-[50px]' : 'w-[200px] h-[70px]'}`}
          />
          <Text className="text-base text-center my-4 text-gray-500 font-rmedium" >{message || 'An error occured. Please, try again later'}</Text>
          <TouchableOpacity className={`${title === "Success !" ? 'bg-green-500' : "bg-red-500"} py-2 px-6 rounded-md text-white`} onPress={closeModal}>
            <Text className="text-white font-bold">Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
    </GestureHandlerRootView>
  )
}
export default Otp
