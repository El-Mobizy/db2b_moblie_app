import { useState, useEffect, useRef } from "react";
import { Link, router } from "expo-router";
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity } from "react-native";
import { images, icons } from "../../constants";
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, FormField } from "../../components";
import { setEmail, setTelephone, setPassword, setValidation, sendMail, loginUser, blockUser, getUserIpAddress } from '../../store/features/userSlice';
import * as Network from "expo-network";
// import { useGlobalContext } from "../../context/GlobalProvider";
import Modal from '../../components/Modal';

const SignIn = () => {
  //   const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  // const [isConnecting, setIsConnecting] = useState(false)
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [currentEmail, setCurrentEmail] = useState('');
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const user = useSelector(state => state.user);
  const [ipAddress, setIpAddress] = useState(undefined);
  const [networkState, setNetworkState] = useState(undefined);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const openModal = () => {
    modalRef.current.handleOpenModal();
  };
  const closeModal = () => {
    modalRef.current.handleCloseModal();
  };
  useEffect(() => {
    const getIpAddress = async () => {
      const ip = await Network.getIpAddressAsync();
      const ipAdress = ip
      setIpAddress(ipAdress);
      user.IpAdress = ipAdress
    };
    getIpAddress();

    const getNetworkState = async () => {
      const state = await Network.getNetworkStateAsync();
      setNetworkState(JSON.stringify(state));
    };
    getNetworkState();
  }, []);

  useEffect(() => {
    // Réinitialise le compteur de tentatives si l'email change
    if (user.email !== currentEmail) {
      setCount(0);
      setCurrentEmail(user.email);
    }
  }, [user.email]);
  const handleInputChange = (name, value) => {
    if (name === 'email') {
      dispatch(setEmail(value));
    } else if (name === 'telephone') {
      dispatch(setTelephone(value));
    } else if (name === 'password') {
      dispatch(setPassword(value));
    }
  };
  const split = (chaine, n) => {
    if (chaine.length <= n) {
      return chaine;
    } else {
      const chaineRaccourcie = chaine.substring(0, n) + '...';
      return chaineRaccourcie
    }
  }
  const handleValidationChange = (field, isValid) => {
    dispatch(setValidation({ field, isValid }));
  };
  const handleSendMail = async () => {
    console.log(user.isValid.mail);
    console.log(user.email);
    if (user.isValid.mail) {
      setSubmitting(true);
      openModal()
      try {
        const email = { email: user.email }
        console.log(email);
        const response = await dispatch(sendMail(email)).unwrap();
        console.log('Requête terminée');
        const info = response;
        console.log('Données reçues:', info);
        if (info.message === "Email invalid") {
          setSubmitting(false)
          setTitle("Error !")
          setMessage(info.message)
          // Alert.alert("Error", info.message)
        }
        else if (info.message === "Email valid") {
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
        setMessage(error.message || "Une erreur est survenue")
      } finally {
        setSubmitting(false);
      }
    } else {
      Alert.alert("Erreur", "Veuillez remplir tous les champs correctement.");
      setSubmitting(false);
    }
  };
  const handlelogin = async () => {
    console.log(user.isValid.mail);
    console.log(user.isValid.password);
    console.log(user.email);
    console.log(user.password);

    if (user.isValid.password) {
      console.log("je suis au moins rentré dans la fonction");
      setSubmitting(true);
      openModal();
      try {
        const loginData = {
          username: user.email,
          password: user.password
        };
        console.log(loginData);

        const response = await dispatch(loginUser(loginData)).unwrap();
        console.log("Après l'API");

        const info = response;
        console.log('Données reçues pour la connexion:', info);

        if (info.error && info.error === "Mot de passe invalide.") {
          console.log('Adresse IP de l\'utilisateur:', ipAddress);
          setCount(c => c + 1);
          setTitle("Error !")
          setMessage(info.error)
          if (count + 1 >= 3) {
            // Appelez l'API pour bloquer l'utilisateur
            const blockData = {
              email: user.email,
              ip_address: ipAddress
            };
            console.log(blockData);
            const blockResponse = await dispatch(blockUser(blockData)).unwrap();
            const infblock = blockResponse
            console.log('Données renvoyé pour le blocage', infblock);
          }
        }
        else if (info.bloked) {
          setTitle("Error !")
          setMessage(`${info.bloked}, ${info.message}`);
        }
        else if (info.error) {
          setTitle("Error")
          setMessage(info.error);
        }
        else {
          setTitle("Success !")
          setMessage('Login successfully !')
          dispatch(loginUser(loginData)).unwrap()
          setSubmitting(false);
          setTimeout(() => {
            router.replace('/otp')
          }, 1000);
        }
        setSubmitting(false);
        // setTimeout(() => {
        // }, 2000);
      } catch (error) {
        console.error("Erreur lors de la tentative de connexion :", error);
        setTitle("Error !")
        setMessage("An error occured, please retry !")
        // Alert.alert("Erreur", "Une erreur est survenue lors de la connexion.");
        setSubmitting(false);
      }
    } else {
      Alert.alert("Erreur", "Veuillez remplir tous les champs correctement.");
      setSubmitting(false);
    }
  };

  return (
    <>
      {step === 0 &&
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
      }
      {step === 1 &&
        <View>
          <Text className="text-base text-black font-rregular my-6 text-center">Heureux de vous revoir. Veuillez entrer votre mot de passe</Text>
          <View className="flex flex-row w-full h-[50px] px-4 relative rounded-md border border-gray-400 justify-between items-center">
            <Text className="text-gray-500 font-rregular text-sm ml-2 bg-white px-2 -top-3 absolute">Email</Text>
            <Text className=" text-base font-rregular text-principal">{split(user.email, 20)}</Text>
            <TouchableOpacity
              onPress={() => setStep(0)}
              activeOpacity={0.7}
              className=""
            >
              <Image
                source={icons.pencil}
                resizeMode="contain"
                className="w-[18px] h-[18px]"
              />
            </TouchableOpacity>
          </View>
          <FormField
            type="password"
            title="Mot de passe"
            otherStyles="mt-8"
            valeur={user.password}
            isLoading={user.isLoading}
            handleChangeText={(e) => handleInputChange('password', e)}
            handleValidationChange={handleValidationChange}
          />
          <View className="flex py-4 justify-end flex-row gap-2">
            <Link
              href="/sign-in"
            >
              <Text className="text-sm font-rregular underline text-principal">Mot de passe oublié ?</Text>
            </Link>
          </View>
          <CustomButton
            title="Se Connecter"
            handlePress={handlelogin}
            containerStyles="mb-4 min-h-[50px]"
            textStyles={"text-lg font-rmedium"}
          // isLoading={isSubmitting}
          />
        </View>
      }
      {step === 0 &&
        <CustomButton
          title="Envoyer"
          handlePress={handleSendMail}
          containerStyles=" my-8 min-h-[50px]"
          textStyles={"text-lg font-rmedium"}
        // isLoading={isSubmitting}
        />}

      <View className="flex flex-col justify-center items-center gap-2">
        <Text className="text-base text-black text-center font-rre  gular">
          ou
        </Text>
        <Text className="text-base text-black text-center font-rregular">
          Se connecter avec
        </Text>
        <View className="flex flex-row justify-center pt-4 items-center space-x-8">
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-[30px] h-[30px]"
          />
          <Image
            source={icons.facebook}
            resizeMode="contain"
            className="w-[30px] h-[30px]"
          />
          <Image
            source={icons.apple}
            resizeMode="contain"
            className="w-[30px] h-[30px]"
          />
        </View>

      </View>
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
    </>
  );
};
export default SignIn









