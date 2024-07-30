import React from 'react'
import { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { images, icons } from "../../constants";
import CustomBottomSheet from "../../components/CustomBottomSheet";
import { OtpInput } from "react-native-otp-entry";
import { Link, router } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CustomButton, FormField } from "../../components";
import { setEmail, setPassword, setPasswordConfirmation, setIp, setValidation, sendMail, disableUser, getUserIpAddress, recoverPassword, sendRecoveryCode, sendRecoveryPassword, getNewRecoveryCode } from '../../store/features/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from '../../components/Modal';
import PageTitle from '../../components/PageTitle';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const forgotPassword = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  // const [isConnecting, setIsConnecting] = useState(false)
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [count, setCount] = useState(0);
  const [iscodevalid, setIscodevalid] = useState(false)
  const [isfilled, setIsFilled] = useState(false)
  const [viewHeight, setViewHeight] = useState(0);
  const bottomSheetRef = useRef(null);
  const modalRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const handleValidationChange = (field, isValid) => {
    dispatch(setValidation({ field, isValid }));
  };
  const handleInputChange = (name, value) => {
    if (name === 'email') {
      dispatch(setEmail(value));
    } else if (name === 'telephone') {
      dispatch(setTelephone(value));
    } else if (name === 'password') {
      dispatch(setPassword(value));
    }
    else if (name === 'password-confirmation') {
      dispatch(setPasswordConfirmation(value));
    }
  };
  const handleSendMail = async () => {
    console.log(user.isValid.mail);
    console.log(user.email);
    if (user.isValid.mail) {
      setSubmitting(true);
      openModal()
      dispatch(setPassword(''));
      dispatch(setPasswordConfirmation(''));
      try {
        const email = { email: user.email }
        console.log(email);
        const response = await dispatch(recoverPassword(email)).unwrap();
        console.log('Requête terminée');
        const info = response;
        console.log('Données reçues:', info);
        if (info.message === "Email not found") {
          setSubmitting(false)
          setTitle("Error !")
          setMessage(info.message)
          // Alert.alert("Error", info.message)
        }
        else if (info.message != "Email not found") {
          closeModal()
          setSubmitting(false)
          setTitle("")
          setMessage("")
          setTimeout(() => {
            setStep(1)
          }, 500)
        }
      } catch (error) {
        setSubmitting(false)
        setTitle("Error !")
        setMessage(error.message || "An error occured.")
      } finally {
        setSubmitting(false);
      }
    } else {
      Alert.alert("Error", "Please fill in all fields correctly.");
      setSubmitting(false);
    }
  };
  const handleOtpChange = (otp) => {
    setOtp(otp);
  };
  const openModal = () => {
    modalRef.current.handleOpenModal();
  };
  const closeModal = () => {
    modalRef.current.handleCloseModal();
  };
  const handleOpenBottomSheet = () => {
    console.log('Ouverture');
    bottomSheetRef.current.openBottomSheet();
  };
  const handleCloseBottomSheet = () => {
    bottomSheetRef.current.closeBottomSheet();
  };
  const handleSendCode = async () => {
    console.log(isfilled);
    console.log(otp);
    if (isfilled) {
      setSubmitting(true);
      openModal()
      try {
        console.log('Ce que je t`\'envoie', otp);
        const data = {
          'otp_code': otp
        }
        const response = await dispatch(sendRecoveryCode(data)).unwrap();
        console.log('Requête terminée');
        const info = response;
        console.log('Données reçues:', info);
        if (info.message == 'otp valide') {
          closeModal()
          setSubmitting(false)
          setIscodevalid(true)
          handleOpenBottomSheet()
          setTimeout(() => {
            handleCloseBottomSheet()
            setStep(2)
          }, 1000)
        }
        else if (info.message == 'Code not found or already used') {
          closeModal()
          setSubmitting(false)
          setIscodevalid(false)
          handleOpenBottomSheet()
        }
      }
      catch (error) {
        setSubmitting(false)
        // setTitle("Error !")
        // setMessage(error.message)
        console.log(error);
      }
      finally {

      }
    } else {
      setSubmitting(false);
      Alert.alert('Erreur', 'Veuillez remplir le code')
    }
  };
  const handleSendPassword = async () => {
    if (user.password === user.password_confirmation) {
      setSubmitting(true);
      openModal()
      try {
        const infos = {
          uid: user.uid,
          data: {
          "password": user.password,
          "password_confirmation": user.password_confirmation
          }
        };
        console.log('Ce que je t`\'envoie', infos);
        const response = await dispatch(sendRecoveryPassword(infos)).unwrap();
        console.log('Requête terminée');
        const info = response;
        console.log('Données reçues:', info);
        if (info.message == 'password updated successfully') {
          setSubmitting(false)
          setTitle("Success !")
          setMessage(info.message)
          setTimeout(() => {
            handleCloseBottomSheet()
            setStep(2)
          }, 1000)
        }
        else if (info.message != 'password updated successfully') {
          setSubmitting(false)
          setTitle("Error !")
          setMessage(info.message)
        }
      }
      catch (error) {
        setSubmitting(false)
        setTitle("Error !")
        setMessage(error.message)
        console.log(error);
      }
      finally {

      }
    } else {
      setSubmitting(false);
      Alert.alert('Error !', 'The password fields does not match')
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
    if (count < 3) {
       try {
        console.log(user.uid);
      const response = await dispatch(getNewRecoveryCode(user.uid)).unwrap();
      console.log('Requête terminée');
      const info = response;
      console.log('Données reçues:', info);
      if (info.message == 'Code sent successfully !') {
        setCount(c => c + 1);
        console.log(count);
        setSubmitting(false);
        setTitle('Success !')
        setMessage(info.message)
        // setTimeout(() => {
        //   router.replace('/home')
        // }, 1000);
      }
      else if (info.message != 'Code sent successfully !') {
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
    else if (count === 3) {
      try {
      console.log(count);
      const blockResponse = await dispatch(disableUser(user.uid)).unwrap();
      const infblock = blockResponse
      console.log('Données renvoyé pour le blocage', infblock);
      setSubmitting(false);
      setTitle("Error !")
      setMessage(infblock.message)
      setTimeout(() => {
          router.replace('/auth')
        }, 2000);
      }
      catch(error){
        setTitle("Error !")
        setMessage(error.message)
      }
      finally{

      }
      
    }
   
  }
  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-white h-full">
        <PageTitle />
        <ScrollView className="h-full">
          <View className="w-full flex justify-center h-full px-4">
            {step === 0 && <View className="my-6 flex justify-center mx-auto flex-col ">
              <View className="w-36 h-36 flex justify-center mx-auto items-center rounded-full bg-[#EEEEEE] ">
                <View className="w-28 h-28 bg-principal flex justify-center items-center rounded-full">
                  <Image
                    source={icons.reset}
                    resizeMode="contain"
                    className="w-12 h-12"
                  />
                </View>
              </View>
              <Text className="mt-6 text-2xl text-center text-black font-rmedium">Reset your password</Text>
              <Text className="font-rregular text-base text-center mt-6">Please enter your email address to receive a password recovery code.</Text>
              <View className="mt-4 ">
                <FormField
                  type="mail"
                  title="Email"
                  otherStyles="mt-7"
                  keyboardType="email-address"
                  placeholder={'johndoe@gmail.com'}
                  valeur={user.email}
                  handleChangeText={(e) => handleInputChange('email', e)}
                  handleValidationChange={handleValidationChange}
                />
              </View>
              <View className="mt-8">
                <CustomButton
                  title="Send"
                  handlePress={handleSendMail}
                  containerStyles=" h-[50px] w-full"
                  textStyles={"text-lg font-rmedium"}
                // isLoading={user.isLoading}
                />
              </View>
            </View>}
            {step === 1 &&
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
                <Text className="mt-6 text-2xl text-center text-black font-rmedium">Recovery code</Text>
                <Text className="font-rregular text-base text-center mt-6">Hi, we would like to inform you that a code has just been sent to you by e-mail. Please enter it to reset your password.</Text>
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
                    <Text className="text-center text-base text-principal cursor-pointer underline font-rregular">Resend Code</Text>
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
              </View>}
            {step === 2 &&
              <View className="my-6 flex w-full mx-auto flex-col ">
                <Text className="mt-6 text-2xl text-center text-black font-rmedium">New password</Text>
                <Text className="font-rregular text-base text-center mt-6">Now, please enter a new password to complete the reset of your old password.</Text>
                <FormField
                  type="password"
                  title="Password"
                  otherStyles="mt-8"
                  valeur={user.password}
                  isLoading={user.isLoading}
                  handleChangeText={(e) => handleInputChange('password', e)}
                  handleValidationChange={handleValidationChange}
                />
                <FormField
                  type="password"
                  title="Confirm Password"
                  otherStyles="mt-8"
                  valeur={user.password_confirmation}
                  isLoading={user.isLoading}
                  handleChangeText={(e) => handleInputChange('password-confirmation', e)}
                  handleValidationChange={handleValidationChange}
                />
                <View className="mt-8">
                <CustomButton
                  title="Reset Password"
                  handlePress={handleSendPassword}
                  containerStyles="h-[50px] w-full"
                  textStyles={"text-lg font-rmedium"}
                // isLoading={user.isLoading}
                />
              </View>
              </View>
              }
          </View>
        </ScrollView>
      </SafeAreaView>
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
          {iscodevalid && <Text className="font-rlight text-base text-center my-6">The code you've entered is valid !</Text>}
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
            <TouchableOpacity
              onPress={() => { setStep(2) }}
              activeOpacity={0.85}
              className={`bg-[#319F43B3] rounded-full w-full h-[50px] shadow-xl flex flex-row justify-center items-center`}
            >
              <Text className={`text-white font-rmedium text-lg text-center font-normal`}>
                Continue
              </Text>
              {/* {isLoading && (
    <ActivityIndicator
      animating={isLoading}
      color="#fff"
      size="small"
      className="ml-2"
    />
  )} */}
            </TouchableOpacity>
          }
        </View>

      </CustomBottomSheet>
    </GestureHandlerRootView>
  )
}

export default forgotPassword