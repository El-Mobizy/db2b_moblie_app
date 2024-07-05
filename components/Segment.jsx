import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledAnimatedView = styled(Animated.View);

const SegmentedControl = ({ options, selectedOption, onOptionPress }) => {
  const { width: windowWidth } = useWindowDimensions();

  const internalPadding = 20;
  const segmentedControlWidth = windowWidth - 40;

  const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

  const rStyle = useAnimatedStyle(() => {
    return {
      left: withTiming(
        itemWidth * options.indexOf(selectedOption) + internalPadding / 2
      ),
    };
  }, [selectedOption, options, itemWidth]);

  return (
    <StyledView
      className="flex-row h-[55px] items-center bg-gray-200 rounded-[10px] pl-[10px]"
      style={{
        width: segmentedControlWidth,
      }}
    >
      <StyledAnimatedView
        className="absolute rounded-[10px] shadow-black shadow-offset-0 shadow-opacity-10 elevation-3 h-3/4  bg-principal"
        style={[
          {
            width: itemWidth,
          },
          rStyle,
        ]}
      />
      {options.map((option) => (
        <StyledTouchableOpacity
          onPress={() => {
            onOptionPress?.(option);
          }}
          key={option}
          className="justify-center items-center"
          style={{
            width: itemWidth,
          }}
        >
          <StyledText
            className={`font-rmedium text-[16px] ${
              option === selectedOption ? 'text-white' : 'text-gray-700'
            }`}
          >
            {option}
          </StyledText>
        </StyledTouchableOpacity>
      ))}
    </StyledView>
  );
};

export default SegmentedControl;
