import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity } from "react-native";
import { images, icons } from "../../constants";
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton, FormField } from "../../components";
import { setEmail, setTelephone, setPassword, setValidation, sendMail, loginUser, blockUser, getUserIpAddress } from '../../store/features/userSlice';
import { isLoading } from "expo-font";
import * as Network from "expo-network";

// import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  //   const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  const [currentEmail, setCurrentEmail] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [ipAddress, setIpAddress] = useState(undefined);
  const [networkState, setNetworkState] = useState(undefined);

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
      try {
        const email = {email : user.email}
        console.log(email);
        const response = await dispatch(sendMail(email)).unwrap();
        console.log('Requête terminée');
        const info = response;
        console.log('Données reçues:', info);
        if (info.message === "Email invalid") {
          setSubmitting(false)
          Alert.alert("Error", info.message)
        }
        else if (info.message === "Email valid") {
          setTimeout(() => {
            setSubmitting(false)
            setStep(1)
         }, 1000)
        }
      } catch (error) {
        Alert.alert("Erreur", error.message || "Une erreur est survenue");
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
          Alert.alert('Error', info.error);
          if (count + 1 >= 3) {
            // Appelez l'API pour bloquer l'utilisateur
            const blockData = {
              email: user.email, 
              ip_address: ipAddress 
            };
            console.log(blockData);
            const blockResponse = await dispatch(blockUser(blockData)).unwrap();
            const infblock = blockResponse
            console.log('Données renvoyé pour le blocage' , infblock);
          }
        } 
        else if (info.bloked) {
          Alert.alert(info.bloked, info.message);
        }
        else if (info.error)  {
          Alert.alert('Error', info.error);
        }
        else{
          Alert.alert('Success', 'Login successfully !')
          dispatch(loginUser(loginData)).unwrap()
          setTimeout(() => {
            setSubmitting(false);
            router.replace('/otp')
          }, 2000);
        }
        setTimeout(() => {
          setSubmitting(false);
        }, 2000);
      } catch (error) {
        console.error("Erreur lors de la tentative de connexion :", error);
        Alert.alert("Erreur", "Une erreur est survenue lors de la connexion.");
        setSubmitting(false);
      }
    } else {
      Alert.alert("Erreur", "Veuillez remplir tous les champs correctement.");
      setSubmitting(false);
    }
  };
  
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logocolor}
            resizeMode="contain"
            className="w-[200px] mx-auto h-[60px]"
          />
          <View className="w-full pt-6">
            <View className="border flex flex-row items-center rounded-full border-principal">
              <CustomButton
                title="Connexion"
                // handlePress={submit}
                containerStyles=" rounded-full h-[45px] w-1/2"
                textStyles={"text-lg"}
              />
              <View className="w-1/2 flex items-center "><Link href="/home"><Text className="text-lg text-center text-principal">Inscription</Text></Link></View>
            </View>
          </View>
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
              <Text className="text-sm text-black font-pregular my-6 text-center">Heureux de vous revoir. Veuillez entrer votre mot de passe</Text>
              <View className="flex flex-row w-full h-14 px-4 relative rounded-lg border border-gray-400 justify-between items-center">
                <Text className="text-gray-500 font-pmedium text-sm ml-2 bg-white px-2 -top-3 absolute">Email</Text>
                <Text className=" text-lg text-principal">{split(user.email, 20)}</Text>
                <TouchableOpacity
                  onPress={() => setStep(0) } 
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
                  <Text className="text-sm font-pregular underline text-principal">Mot de passe oublié ?</Text>
                </Link>
              </View>
              <CustomButton
                title="Se Connecter"
                handlePress={handlelogin}
                containerStyles="min-h-[56px]"
                textStyles={"text-lg"}
                isLoading={user.isLoading}
              />
            </View>
          }
          {step === 0 &&
            <CustomButton
              title="Envoyer"
              handlePress={handleSendMail}
              containerStyles=" mt-8 min-h-[56px]"
              textStyles={"text-lg"}
              isLoading={user.isLoading}
            />}

          <View className="flex flex-col justify-center items-center pt-5 gap-2">
            <Text className="text-lg text-black text-center font-pregular">
              ou
            </Text>
            <Text className="text-lg text-black text-center font-pregular">
              Se connecter avec
            </Text>
            <View className="flex flex-row justify-center pt-2 items-center space-x-6">
              <Image
                source={icons.google}
                resizeMode="contain"
                className="w-[35px] h-[40px]"
              />
              <Image
                source={icons.facebook}
                resizeMode="contain"
                className="w-[35px] h-[40px]"
              />
              <Image
                source={icons.apple}
                resizeMode="contain"
                className="w-[35px] h-[40px]"
              />
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;







