import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import * as SecureStore from "expo-secure-store";
import {BASE_URL} from '@env'
// styled components
import {
  ModalAction,
  ModalButton,
  ModalIcon,
  ModalView,
  ModalContainer,
  ModalActionGroup,
  StyledInput,
  HeaderTitle,
  colors,
  ErrorText,
} from "../styles/appStyles";

// Expo vector icons
import { AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import {
  selectAddTodo,
  selectModalVisible,
  selectTodoToBeEdited,
  selectUpdateUsername,
  setAddTodo,
  setModalVisible,
  setTodos,
  setTodoToBeEdited,
  setUpdateUsername,

} from "../slices/todoAppSlice";
import axios from "axios";
import moment from "moment";

const InputModal = ({token}) => {
  const [inputValue, setInputValue] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  // redux
  const modalVisible = useSelector(selectModalVisible);
  const todoToBeEdited = useSelector(selectTodoToBeEdited);
  const addTodo = useSelector(selectAddTodo);
  const dispatch = useDispatch();
 const updateUser=useSelector(selectUpdateUsername);
  // FUNCTIONS
  // when add todo is false which clearly means user is updating set the input value to the item which is being updated
  // This runs before component mounts
  useEffect(() => {
    !addTodo&&setInputValue(todoToBeEdited?.title)
    updateUser&&setInputValue("")
  },[addTodo,updateUser])
  useEffect(() => {
    updateUser&&setInputValue("")
  },[updateUser])

  // This function closes the modal by setting modal visibility state to false an updating other redux states
  const handleCloseModal = () => {
    dispatch(setModalVisible(false));
    dispatch(setTodoToBeEdited(null));
    dispatch(setAddTodo(null))
    setErrorMsg(null)
    setInputValue("");
  };

  // This function opens the modal by setting modal visibility state to true 
  // Also setting the addTodo redux state to true to allow us to add a todo
  const handleOpenModal = () => {
    dispatch(setModalVisible(true));
    dispatch(setAddTodo(true));
    dispatch(setUpdateUsername(false))
    setInputValue("");
  };

  // ==========================================================================================================================add todo
  //This function adds a todo if addTodo state is true else if its false and user clicked on an item then it will edit
  const handleAddTodo = () => {
    
// if update user 
if(updateUser){

  // update user under
  const updateUserUrl=`${BASE_URL}/api/user/update`;
  const userInput ={name:inputValue}
  axios.put(updateUserUrl,userInput,{
    headers: { Authorization: `Bearer ${token}` }
  }).then((res)=>{
    if(res.data.status=== "success"){
         alert("Your name shall change on next restart")
          dispatch(setModalVisible(false));
          setInputValue("")
    }
  
    if (res.data.status === "error") {
      setErrorMsg("Enter valid input to update your name");
    }
  })
}
    // =======================================adding to do
    if(addTodo) {
    //   add todo url
    const addTodoUrl = `${BASE_URL}/api/user/todos`;
    let date = moment().format("ddd, D MMM YYYY hh:mm:ss A");

    const todoData = { title: inputValue, date: date };

    axios
      .post(addTodoUrl, todoData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((results) => {
       if(results.data.status==="success"){
        let todos = [];    
        results.data.todos.map((item) => {
          todos.push({
            key: item.id,
            title: item.title,
            date: item.date,
            completed: item.completed
          });
        });
            // Setting the maped array into our redux array
                //  Then setting input to null and clearing the modal by setting its redux state to false
                dispatch(setTodos(todos));
                setInputValue("");
                dispatch(setModalVisible(false));
                dispatch(setAddTodo(null))
       
      } 
       // If request has an error set the error and display them
        if (results.data.status === "error") {
          setErrorMsg("Enter what you want to do");
        }
      });
    }
    if(!addTodo) {
  //========================================================================================================edit todo  
  // This function is going to allow us to update a todo
      // edit url
      const editTodoUrl =`${BASE_URL}/api/user/todos/`+ todoToBeEdited?.key;
 
// edit input
 const editInput={title:inputValue,date:todoToBeEdited?.date}

      axios.put(editTodoUrl,editInput,{
        headers:{Authorization: `Bearer ${token}`} ,
      }).then((results)=>{
      // If todo  updated we going to  get all todos
        if(results.data.status === "success"){
        
          let todos = [];
          results.data.todos.map((item) => {
            todos.push({
              key: item.id,
              title: item.title,
              date: item.date,
              completed:item.completed
            });
          });
            // Setting the maped array into our redux array
                //  Then setting input to null and clearing the modal by setting its redux state to false
                // Also setting the addtodo redux state to null 
                dispatch(setTodos(todos));
                setInputValue("");
                dispatch(setModalVisible(false));
                dispatch(setAddTodo(null))
         
        
        }
        
        // If request error set the error and display them
        if (results.data.status === "error") {
          setErrorMsg("Update what you want to do");
        }
      })
    }
      };

  return (
    <>
      <ModalButton onPress={handleOpenModal}>
        <AntDesign name="plus" size={30} color={colors.secondary} />
      </ModalButton>
      {/* Modal view */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <ModalContainer>
    
          <ModalView
            source={require("../assets/images/bg.jpg")}
            imageStyle={{ borderRadius: 20 }}
          >
            <ModalIcon>
              <HeaderTitle style={{ color: colors.primary }}>{updateUser?"Update Name":"To-Do"}</HeaderTitle>
              <AntDesign name="edit" size={30} color={colors.tertiary} />
            </ModalIcon>
            <StyledInput
              placeholder={updateUser?"Update user name":"What do you want to do?"}
              placeholderTextColor={colors.alternative}
              selectionColor={colors.secondary}
              autoFocus={true}
              onChangeText={(text) => {
                setInputValue(text), setErrorMsg(null);
              }}
              value={inputValue}
              onSubmitEditing={handleAddTodo}
            />
            {errorMsg && (
              <ErrorText style={{ alignSelf: "center", top: 10, fontSize: 15 }}>
                {errorMsg}
              </ErrorText>
            )}
            <ModalActionGroup>
              <ModalAction color={colors.primary} onPress={handleCloseModal}>
                <AntDesign name="close" size={28} color={colors.secondary} />
              </ModalAction>
              <ModalAction color={colors.tertiary} onPress={handleAddTodo}>
                <AntDesign name="check" size={28} color={colors.secondary} />
              </ModalAction>
            </ModalActionGroup>
          </ModalView>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default InputModal;
