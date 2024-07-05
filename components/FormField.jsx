import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Animated } from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  placeholder,
  otherStyles,
  type,
  onChangeText,
  valeur,
  handleChangeText,
  handleValidationChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const input = useRef(null);
  const labelPosition = useRef(new Animated.Value(0)).current;
  const [validationMessage, setValidationMessage] = useState('');
  const [classeState, setClasseState] = useState('hidden');
  const [cla, setCla] = useState('focus:border-principal');

  useEffect(() => {
    if (valeur != "") {
      Animated.timing(labelPosition, {
        toValue: -25,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [valeur]);

  const open = () => {
    input.current.focus();
  };

  const fonc = () => {
    setIsFocused(true);
    Animated.timing(labelPosition, {
      toValue: -25,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fonc1 = () => {
    setIsFocused(false);
    if (valeur === "") {
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const validate = (input) => {
    let isValid = false;
    switch (type) {
      case 'mail':
        isValid = isValidEmail(input);
        break;
      case 'number':
        isValid = isValidNumber(input);
        break;
      case 'text':
        isValid = isValidText(input);
        break;
      case 'password':
        isValid = isValidPassword(input);
        break;
      default:
        isValid = true;
        break;
    }
    handleValidationChange(type, isValid);
    return isValid;
  };

  const isValidEmail = (email) => {
    const mail = email.trim();
    if (mail.length <= 0) {
      setClasseState('text-red-500 text-xs mt-1 font-rmedium');
      setValidationMessage('Veuillez remplir le champ');
      setCla('focus:border-red-500');
      return false;
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)) {
      setClasseState('text-red-500 text-xs mt-1 font-rmedium');
      setValidationMessage('Saisie incorrecte! Veuillez entrez un mail valide');
      setCla('focus:border-red-500');
      return false;
    } else {
      setClasseState('hidden');
      setValidationMessage('');
      setCla('focus:border-[#30C1BA]');
      return true;
    }
  };

  const isValidText = (text) => {
    const texte = text.trim();
    if (texte.length <= 0) {
      setClasseState('text-red-500 text-xs mt-1 font-rmedium');
      setValidationMessage('Veuillez remplir le champ');
      setCla('focus:border-red-500');
      return false;
    } else if (!/^(.*[a-zA-Z].*){2,}$/u.test(texte)) {
      setClasseState('text-red-500 text-xs mt-1 font-rmedium');
      setValidationMessage('Cette chaîne doit être d\'au moins 2 caractères');
      setCla('focus:border-red-500');
      return false;
    } else {
      setClasseState('hidden');
      setValidationMessage('');
      setCla('focus:border-[#30C1BA]');
      return true;
    }
  };

  const isValidPassword = (password) => {
    const pass = password.trim();
    if (pass.length <= 0) {
      setClasseState('text-red-500 text-xs mt-1 font-rmedium');
      setValidationMessage('Veuillez remplir le champ');
      setCla('focus:border-red-500');
      return false;
    } 
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/.test(pass)) {
      setClasseState('text-red-500 text-xs mt-1 font-rmedium');
      setValidationMessage('Cette chaîne doit être d\'au moins 8 caractères dont un majuscule, un minuscule, un chiffre et un caractère spécial');
      setCla('focus:border-red-500');
      return false;
    } 
    else {
      setClasseState('hidden');
      setValidationMessage('');
      setCla('focus:border-[#30C1BA]');
      return true;
    }
  };

  const isValidNumber = (numero) => {
    const num = numero;
    if (num <= 0) {
      setClasseState('text-red-500 text-xs mt-1 font-rmedium');
      setValidationMessage('Veuillez remplir le champ');
      setCla('focus:border-red-500');
      return false;
    } else {
      setClasseState('hidden');
      setValidationMessage('');
      setCla('focus:border-[#30C1BA]');
      return true;
    }
  };

  return (
    <View className={`flex justify-center ${otherStyles}`}>
      <View className={`w-full h-[50px] px-4 rounded-md border border-gray-300 flex flex-row items-center ${cla}`}>
        <Animated.Text
          onPress={open}
          style={{
            position: 'absolute',
            left: 10,
            transform: [{ translateY: labelPosition }],
            fontSize: isFocused || valeur ? 14 : 16,
            backgroundColor: 'white',
            paddingHorizontal: 5,
            zIndex: 1,
          }}
          className="text-gray-500 font-rregular"
        >
          {title}
        </Animated.Text>
        <TextInput
          ref={input}
          className="flex-1 text-gray-700 font-rregular text-base"
          value={valeur}
          type={type}
          placeholder={placeholder}
          placeholderTextColor={isFocused ? "#7B7B8B" : '#fff'}
          onChangeText={(text) => {
            handleChangeText(text);
            validate(text);
          }}
          secureTextEntry={type === "password" && !showPassword}
          {...props}
          onFocus={fonc}
          onBlur={fonc1}
        />
        {type === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      <Text className={classeState}>{validationMessage}</Text>
    </View>
  );
};

export default FormField;
