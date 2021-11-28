import React, { useState } from "react";
import {
  colors,
  ErrorText,
  RegisterText,
  RegisterView,
  StyledInput,
  SubmitButton,
  SubmitButtonText,
} from "../styles/appStyles";
import * as Animatable from "react-native-animatable";
import Axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { ActivityIndicator } from "react-native";
import { BASE_URL } from "@env";
import { useDispatch } from "react-redux";
import { setTodos } from "../slices/todoAppSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [nameError, setNameError] = useState();
  const navigation = useNavigation();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const dispatch = useDispatch();
  // FUNCTIONS

  // ========================================================================================REGISTER
  const handleRegister = () => {
    setIsSubmiting(true);
    let userToken = "";
    let userId = "";
    let userName = "";
    let userImage="";
    // register api
    const registerUserUrl = `${BASE_URL}/api/user/register`;
    // user inputs data
    const userRegisterData = { name: name, email: email, password: password };

    // registering user
    Axios.post(registerUserUrl, userRegisterData)
      .then((res) => {
       
        // If user registered we going to get user details and generated token
        if (res.data.status === "success") {
          // console.log(res.data)
          userToken = res.data.token;
          userName = res.data.data.name;
          userId = res.data.data.id;
          userToken = res.data.token;
          
        
          dispatch(setTodos([]));
          // navigating user to HomeScreen
          navigation.replace("Home", {
            name: name,
            token: userToken,
            id: userId,
            image:""
          });
        }
      // If error display the errors 
        if (res.data.status === "error") {
          setIsSubmiting(false);
          setNameError(res.data.validation_errors.name);
          setPasswordError(res.data.validation_errors.password);
          setEmailError(res.data.validation_errors.email);
        }
      })
      .catch((error) => {
        console.log(error.response.headers)
        console.log(error.response.data)
        console.log(error.response.status)
      });
  };
  return (
    // Register view
    <RegisterView>
      <RegisterText>Register and manage your tasks</RegisterText>
      <StyledInput
        placeholder="Enter your name"
        placeholderTextColor={colors.alternative}
        selectionColor={colors.secondary}
        autoFocus={false}
        onChangeText={(text) => {
          setName(text), setNameError(null);
        }}
        value={name}
        style={{ width: "100%", margin: 10 }}
      />
      {/* Name error */}
      {nameError && <ErrorText>{nameError}</ErrorText>}

      <StyledInput
        placeholder="Enter your email address"
        placeholderTextColor={colors.alternative}
        selectionColor={colors.secondary}
        autoFocus={false}
        onChangeText={(text) => {
          setEmail(text), setEmailError(null);
        }}
        value={email}
        style={{ width: "100%", margin: 10 }}
      />
      {/* Email Error */}
      {emailError && <ErrorText>{emailError}</ErrorText>}
      <StyledInput
        placeholder="Enter your password"
        placeholderTextColor={colors.alternative}
        selectionColor={colors.secondary}
        autoFocus={false}
        onChangeText={(text) => {
          setPassword(text), setPasswordError(null);
        }}
        value={password}
        style={{ width: "100%", margin: 10 }}
        onSubmitEditing={handleRegister}
      />
      {/* Password error */}
      {passwordError && <ErrorText>{passwordError}</ErrorText>}

      {/* Submit Button View */}
      <Animatable.View
        animation="fadeIn"
        delay={500}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <SubmitButton onPress={handleRegister} disabled={isSubmiting}>
          {!isSubmiting ? (
            <SubmitButtonText>Sign Up</SubmitButtonText>
          ) : (
            <ActivityIndicator
              animating={true}
              size="small"
              color={colors.primary}
            />
          )}
        </SubmitButton>
      </Animatable.View>
    </RegisterView>
  );
};

export default Register;
