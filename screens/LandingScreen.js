import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import * as Animatable from "react-native-animatable";

// Background Image
import ImageBg from "../assets/images/bg.jpg";

// components
import Login from "../components/Login";
import Register from "../components/Register";


// styled components
import {
  ButtonView,
  colors,
  CredentialsView,
  LandingBackgroundImage,
  LoginButtonText,
  LoginButtonView,
  RegisterButtonText,
  RegisterButtonView,
} from "../styles/appStyles";

const LandingScreen = () => {
    const [showLogin,setShowLogin] =useState(true)
    
  return (
    <KeyboardAvoidingView behavior="position">
  
      <StatusBar style="light" />
      {/* TOP VIEW */}
      <Animatable.View animation="fadeIn" easing="ease-in">
        <LandingBackgroundImage
          source={ImageBg}
          imageStyle={{
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
        ></LandingBackgroundImage>
      </Animatable.View>


      {/* Login and Register view */}
      <Animatable.View animation="slideInUp">
        <CredentialsView>
          <ButtonView>

            {/* login button */}
            <LoginButtonView
              onPress={() => setShowLogin(true)}
              showLogin={showLogin}
            >
              <LoginButtonText  showLogin={showLogin} >Login</LoginButtonText>
            </LoginButtonView>

            {/* register button */}
            <RegisterButtonView
            onPress={()=>setShowLogin(false)}
            showLogin={showLogin}
            >
            
              <RegisterButtonText  showLogin={showLogin}>Register</RegisterButtonText>
            </RegisterButtonView>
          </ButtonView>
          {/* If showLogin is true a login component will be show else  a register component will be shown */}
          {showLogin?<Login/>:<Register/>}
        </CredentialsView>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

export default LandingScreen;
