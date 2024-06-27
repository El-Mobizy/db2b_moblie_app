import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
const TabIcon = ({ icon, color, focused }) => {
  if (focused) {
    return (
      <View style={styles.focusedIconContainer}>
        <Icon name={icon} size={25} color="#7910ff" />
      </View>
    );
  }
  return <Icon name={icon} size={25} color={color} />;
};
const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: '#1c1c1c',
            marginHorizontal: 15,
            height: 70,
            display:'flex',
            borderTopWidth: 0,
            position: "absolute",
            bottom: 4,
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            borderRadius: 50,
            overflow: 'hidden', // Ensures that the corners are rounded
          },
        }}
      >
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={'search-outline'}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused }) => (
              <TabIcon
                icon={'heart-outline'}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused }) => (
              <TabIcon
                icon={'home-outline'}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused }) => (
              <TabIcon
                icon={'person-outline'}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
         <Tabs.Screen
          name="menu"
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused }) => (
              <TabIcon
                icon={'menu-outline'}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  
  focusedIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 35,
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
