import React, { useEffect, useState } from "react";
import {
  colors,
  ErrorText,
  LoginText,
  LoginView,
  StyledInput,
  SubmitButton,
  SubmitButtonText,
} from "../styles/appStyles";
import * as Animatable from "react-native-animatable";
import Axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { BASE_URL } from "@env";
import { setImageUri, setTodos } from "../slices/todoAppSlice";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const navigation = useNavigation();

  // redux
  const dispatch = useDispatch();

  // Functions
  // ==================================================================================Runs before component mounts and sets our redux array to null 
  useEffect(() => {
    dispatch(setTodos(null));
    dispatch(setImageUri(null));
  });

  // ==========================================================================LOGIN
  const handleLogin = () => {
    setIsSubmiting(true);
    let userToken = "";
    let userName = "";
    let userId = "";
    let userImage="";
    // login api
    const loginUserUrl = `${BASE_URL}/api/user/login`;

    // user input data
    const loginData = { email: email, password: password };

    //================================================ getting api to log in an existing user
    Axios.post(loginUserUrl, loginData)
      .then((res) => {
        
        // if user is available get user data and generated token
        if (res.data.status === "success") {
          console.log(res.data)
          userToken = res.data.token;
          userName = res.data.data.name;
          userId = res.data.data.id;
          userImage=res.data.data.image
              // get todos url
              const getTodosUrl = `${BASE_URL}/api/user/todos`;
              axios
                .get(getTodosUrl, {
                  headers: { Authorization: `Bearer ${res.data.token}` },
                })
                .then((res) => {
                  // Getting all todos of the user
                  if (res.data.status === "success") {
                    let todo = [];
                  //  Mapping the todos according to how it is needed in the list item
                    res.data.todos.map((item) => {
                      todo.push({
                        key: item.id,
                        title: item.title,
                        date: item.date,
                        completed: item.completed,
                      });
                    });
                    // Setting the maped array into our redux array
                    dispatch(setTodos(todo));
                  }
                });
              //  passing data into home component
              navigation.replace("Home", {
                name: userName,
                token: userToken,
                id: userId,
              });
              dispatch(setImageUri(userImage));
             
        }
         
        // If request failed set the error and display them
        if (res.data.status === "failed") {
        console.log(res.data)
        setPasswordError(res.data.message)
        setIsSubmiting(false);
        }
  // If request has an error set the error and display them
        if (res.data.status === "error") {
          setIsSubmiting(false);
          setEmailError(res.data.validation_errors.email);
          setPasswordError(res.data.validation_errors.password);
        }
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response.headers)
        console.log(error.response.data)
        console.log(error.response.status)
      });
  };

  // =============================================================================================================

  return (
    // Login view
    <LoginView>
      <LoginText>Login and manage your tasks</LoginText>

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
      />
      {/* Password error */}
      {passwordError && <ErrorText>{passwordError}</ErrorText>}
      <Animatable.View
        animation="fadeIn"
        delay={500}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <SubmitButton onPress={handleLogin} disabled={isSubmiting}>
          {!isSubmiting ? (
            <SubmitButtonText>Sign In</SubmitButtonText>
          ) : (
            <ActivityIndicator
              animating={true}
              size="small"
              color={colors.primary}
            />
          )}
        </SubmitButton>
      </Animatable.View>
    </LoginView>
  );
};

export default Login;
