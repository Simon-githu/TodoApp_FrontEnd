import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
// redux provider
import { Provider } from "react-redux";

// screens
import HomeScreen from "./screens/HomeScreen";
import LandingScreen from "./screens/LandingScreen";



// redux store
import { store } from "./store";

//styled components 
import { Container } from "./styles/appStyles";
import SplashScreen from "./screens/SplashScreen";

// react navigation
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="Splash" component={SplashScreen} /> 
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>

    </Provider>
  );
}
