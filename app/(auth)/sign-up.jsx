import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { images } from "../../constants";
import { register } from "../../lib/functions";
import { CustomButton, FormField } from "../../components";
import { setEmail, setTelephone, setPassword, setValidation, initialiseData, signUpUser } from '../../store/features/userSlice';
// import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  //   const { setUser, setIsLogged } = useGlobalContext();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleInputChange = (name, value) => {
    if (name === 'email') {
      dispatch(setEmail(value));
    } else if (name === 'telephone') {
      dispatch(setTelephone(value));
    } else if (name === 'password') {
      dispatch(setPassword(value));
    }
  };
  const handleValidationChange = (field, isValid) => {
    dispatch(setValidation({ field, isValid }));
  };
  const handleSignUp = async () => {
    console.log(user.isValid.mail);
    console.log(user.isValid.number);
    console.log(user.isValid.password);
    console.log(isChecked);
    console.log(user);
  
    if (user.isValid.mail && user.isValid.number && user.isValid.password && isChecked) {
      setSubmitting(true);
      try {
        const response = await dispatch(signUpUser(user)).unwrap();
        console.log('Requête terminée');
        const info = response;
        console.log('Données reçues:', info);
  
        if (info.errors) {
          let totalErrors = 0;
          Object.keys(info.errors).forEach(key => {
            totalErrors += info.errors[key].length;
          });
  
          if (totalErrors <= 1) {
            if (info.errors.phone) {
              Alert.alert(info.message, info.errors.phone[0]);
            }
            if (info.errors.email) {
              Alert.alert(info.message, info.errors.email[0]);
            }
            if (info.errors.password) {
              Alert.alert(info.message, info.errors.password[0]);
            }
          } else {
            const errorMessages = Object.keys(info.errors).map(key => {
              return `\n${info.errors[key].join(', ')}`;
            }).join('\n');
            Alert.alert(info.message, errorMessages);
          }
        } else {
          Alert.alert("Success", info.message);
          setTimeout(() => {
            setEmail('')
            setPassword('')
            setTelephone('')
            setSubmitting(false);
            router.replace("/sign-in");
          }, 3000);
        }
      } catch (error) {
        Alert.alert("Erreur", error.message || "Une erreur est survenue lors de l'inscription");
      } finally {
        setSubmitting(false);
      }
    } else {
      Alert.alert("Erreur", "Veuillez remplir tous les champs correctement.");
      setSubmitting(false);
    }
  };
  
  
  const [isSubmitting, setSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
  };
  const [UserInfo, setUserInfo] = useState({
    email: " ",
    phone: " ",
    password: " ",
    country_id: 229,
    password_confirmation: " "
  });

  const submit = async () => {
    // if (UserInfo.username === "" || UserInfo.email === "" || UserInfo.password === "") {
    //   Alert.alert("Erreur", "Veuillez remplir tous les champs");
    // }
    setSubmitting(true);
    try {
      console.log(UserInfo);
      const result = await register(UserInfo.telephone, UserInfo.email);
      setTimeout(() => {
        setSubmitting(false)
        // router.replace("/sign-in");
      }, 3000)
    } catch (error) {
      Alert.alert("Erreur", error.message);
      setSubmitting(false)
    } finally {
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
              <View className="w-1/2 flex items-center "><Link href="/sign-in"><Text className="text-lg text-center text-principal">Connexion</Text></Link></View>
              <CustomButton
                title="Inscription"
                handlePress={submit}
                containerStyles=" h-[45px] w-1/2"
                textStyles={"text-lg"}
              />
            </View>
          </View>
          <FormField
          type="mail"
          value={user.email}
            title="Email"
            otherStyles="mt-7"
            keyboardType="email-address"
            handleChangeText={(e) => handleInputChange('email', e)}
            handleValidationChange={handleValidationChange}
          />
          <FormField
          type="number"
            title="Télephone"
            value={user.telephone}
            otherStyles="mt-10"
            keyboardType="number-pad"
            handleChangeText={(e) => handleInputChange('telephone', e)}
            handleValidationChange={handleValidationChange}
          />
          <FormField
            type="password"
            title="Mot de passe"
            value={user.password}
            otherStyles="mt-7"
            handleChangeText={(e) => handleInputChange('password', e)}
            handleValidationChange={handleValidationChange}
          />
          {/* <FormField
            title="Confirmer le Mot de passe"
            value={UserInfo.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          /> */}
          <View className="flex py-4 flex-row w-full">
            <BouncyCheckbox
              isChecked={isChecked}
              size={25}
              fillColor="#A734C4"
              unFillColor="#FFFFFF"
              onPress={handleCheckBoxChange}
            />
            <Text className="text-sm mr-1 font-pregular">J'ai lu les</Text>
            <Link
              href="/"
              className="text-sm w-fit font-pregular underline text-[#D142F5]"
            >
              <Text>Termes et conditions</Text> 
            </Link>
          </View>
          <CustomButton
            title="S'inscrire"
            handlePress={handleSignUp}
            containerStyles="min-h-[56px]"
            textStyles={'text-lg'}
            isLoading={user.isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;








