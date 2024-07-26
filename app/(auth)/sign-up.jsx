import { useState, useRef } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { images } from "../../constants";
import { register } from "../../lib/functions";
import { CustomButton, FormField } from "../../components";
import { setEmail, setTelephone, setPassword, setValidation, initialiseData, signUpUser } from '../../store/features/userSlice';
// import { useGlobalContext } from "../../context/GlobalProvider";
import Modal from '../../components/Modal';


const SignUp = () => {
  //   const { setUser, setIsLogged } = useGlobalContext();
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const user = useSelector(state => state.user);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const handleInputChange = (name, value) => {
    if (name === 'email') {
      dispatch(setEmail(value));
    } else if (name === 'telephone') {
      dispatch(setTelephone(value));
    } else if (name === 'password') {
      dispatch(setPassword(value));
    }
  };
  const openModal = () => {
    modalRef.current.handleOpenModal();
  };
  const closeModal = () => {
    modalRef.current.handleCloseModal();
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
      openModal()
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
              setTitle("Error !")
              setMessage(info.message, info.errors.phone[0])
              // Alert.alert(info.message, info.errors.phone[0]);
            }
            if (info.errors.email) {
              setTitle("Error !")
              setMessage(info.message, info.errors.email[0])
              // Alert.alert(info.message, info.errors.email[0]);
            }
            if (info.errors.password) {
              setTitle("Error !")
              setMessage(info.message, info.errors.password[0])
              // Alert.alert(info.message, info.errors.password[0]);
            }
          } else {
            const errorMessages = Object.keys(info.errors).map(key => {
              return `\n${info.errors[key].join(', ')}`;
            }).join('\n');
            setTitle("Error !")
            setMessage(info.message, errorMessages)
            // Alert.alert(info.message, errorMessages);
          }
        } else {
          // Alert.alert("Success", info.message);
          setTitle("Success !")
          setMessage(info.message)
          setSubmitting(false)
          setTimeout(() => {
          setEmail('')
          setPassword('')
          setTelephone('')
          setSubmitting(false);
          router.replace("/auth");
          }, 3000);
        }
      } catch (error) {
        setTitle("Error !")
            setMessage(info.message, error.message || "Une erreur est survenue lors de l'inscription")
        // Alert.alert("Erreur", error.message || "Une erreur est survenue lors de l'inscription");
      } finally {
        setSubmitting(false);
      }
    } else {
      Alert.alert("Erreur", "Veuillez remplir tous les champs correctement.");
      setSubmitting(false);
    }
  };
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
    <>
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
            title="Phone"
            value={user.telephone}
            otherStyles="mt-10"
            keyboardType="number-pad"
            handleChangeText={(e) => handleInputChange('telephone', e)}
            handleValidationChange={handleValidationChange}
          />
          <FormField
            type="password"
            title="Password"
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
              fillColor="#7910ff"
              unFillColor="#FFFFFF"
              onPress={handleCheckBoxChange}
            />
            <Text className="text-sm mr-1 font-pregular">I read the</Text>
            <Link
              href="/"
              className="text-sm w-fit font-pregular underline text-[#7910ff]"
            >
              <Text>terms and conditions</Text> 
            </Link>
          </View>
          <CustomButton
            title="Register"
            handlePress={handleSignUp}
            containerStyles="min-h-[56px]"
            textStyles={'text-lg'}
            isLoading={user.isLoading}
          />
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
            <Text className="text-white font-bold">Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default SignUp;








