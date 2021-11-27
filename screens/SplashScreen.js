import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, ImageBackground } from "react-native";
import { colors, HeaderTitle } from "../styles/appStyles";
import {AntDesign} from '@expo/vector-icons'
const SplashScreen = () => {

    // redux
  const navigation = useNavigation();
  
  // FUNCTIONS
  // it will run after 3 seconds
  useEffect(() => {
    setTimeout(()=>{
         navigation.replace("Landing")
             },3000)
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/bg.jpg")}
      style={{ flex: 1,alignItems: "center",justifyContent: "center"}}
    >
    <HeaderTitle style={{ color: colors.primary }}>To-Do</HeaderTitle>
    <AntDesign name="edit" size={50} color={colors.tertiary }/>
      <StatusBar style="light" />
      <ActivityIndicator animating={true} size="large" color={colors.primary} style={{top:20}}/>
    </ImageBackground>
  );
};

export default SplashScreen;
