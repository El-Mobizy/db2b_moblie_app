import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


const ScreenLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="cart"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="details"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default ScreenLayout;
