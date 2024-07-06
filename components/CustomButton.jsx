import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  notValid
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-principal rounded-lg shadow-2xl flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      } ${notValid ? 'cursor-not-allowed' : ''} `}
      disabled={isLoading || notValid}

    >
      <Text className={`text-white text-center ${textStyles}`}>
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
