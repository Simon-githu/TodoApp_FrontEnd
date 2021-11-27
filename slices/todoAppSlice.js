import { createSlice } from "@reduxjs/toolkit";
//===========================================================================================================
const initialState = {
  todos:[],
  modalVisible:false,
  todoToBeEdited:null,
  addTodo:true,
  imageUri:null,
  todoCompleted:false,
  updateUsername:false,
  userName:null,
  userToken:null,
 userId:null
};
//===========================================================================================================
export const todoAppSlice = createSlice({
  name: "todoApp",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
    setTodoToBeEdited: (state, action) => {
      state.todoToBeEdited = action.payload;
    },
    setAddTodo: (state, action) => {
      state.addTodo = action.payload;
    },
    setImageUri: (state, action) => {
      state.imageUri = action.payload;
    },
    setTodoCompleted: (state, action) => {
      state.todoCompleted = action.payload;
    },
    setUpdateUsername: (state, action) => {
      state.updateUsername = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
  }
});
//===========================================================================================================
export const {setTodos,setModalVisible,setTodoToBeEdited,setTodoInputValue,setAddTodo,setImageUri,setTodoCompleted,setUpdateUsername,setUserName,setUserId,setUserToken} = todoAppSlice.actions;
//===========================================================================================================
// Selector it will allow us to take data back to redux layer
export const selectTodos = (state) => state.todoApp.todos;
export const selectModalVisible = (state) => state.todoApp.modalVisible;
export const selectTodoToBeEdited=(state)=>state.todoApp.todoToBeEdited;
export const selectAddTodo=(state)=>state.todoApp.addTodo;
export const selectImageUri=(state)=>state.todoApp.imageUri;
export const selectTodoCompleted=(state)=>state.todoApp.todoCompleted;
export const selectUpdateUsername=(state)=>state.todoApp.updateUsername;
export const selectUserName=(state)=>state.todoApp.UserName;
export const selectUserToken=(state)=>state.todoApp.UserToken;
export const selectUserId=(state)=>state.todoApp.UserId;


export default todoAppSlice.reducer;
