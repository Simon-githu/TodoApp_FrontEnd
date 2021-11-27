import React, { useEffect, useState } from "react";
import { BASE_URL } from "@env";
// Using swipe list view to enable list of items to be swipable and gives me access to other items
// functionalitis like deleting
import { SwipeListView } from "react-native-swipe-list-view";

// expo vector icons
import { Entypo } from "@expo/vector-icons";

// styled components
import {
  ListView,
  TodoText,
  TodoDate,
  ListViewHidden,
  // when a list is swiped we use swipedTodoText to style the title of the todo
  SwipedTodoText,
  HiddenButton,
  colors,
  TodoTitle,
  TitleView,
  ErrorText,
} from "../styles/appStyles";
import {
  selectTodos,
  setAddTodo,
  setModalVisible,
  setTodos,
  setTodoToBeEdited,
  setUpdateUsername,
} from "../slices/todoAppSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { ActivityIndicator, Alert } from "react-native";


const ListItems = ({ name, token }) => {
  // use swipedRow state to keep track of the swiped row items
  const [swipedRow, setSwipedRow] = useState(null);
  const [search, setSearch] = useState(null);
  const [isDeleting,setIsDeleting] = useState(false);
  // redux
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  // Funtions
  //   Deleting a todo
  // ===============================================================================Delete Todo
  // Takes id of the swiped row (todo)
  const handleDeleteTodo = (rowMap,rowKey) => {
        setIsDeleting(true)
    // delete todo 
    const deleteTodoUrl = `${BASE_URL}/api/user/todos/` + rowKey;
    axios
      .delete(deleteTodoUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
    //  If todo deleted we going to get all todos and update our redux todo array
        if (res.data.status === "success") {
          setIsDeleting(false)
          // get todos url
          const getTodosUrl = `${BASE_URL}/api/user/todos`;
          axios
            .get(getTodosUrl, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
          // if all todos of user is found map them according to the format it wanted in list items
              if (res.data.status === "success") {
                let todos = [];
                res.data.todos.map((item) => {
                  todos.push({
                    key: item.id,
                    title: item.title,
                    date: item.date,
                    completed: item.completed
                  });
                });
               // Setting the maped array into our redux array
              //  And also deleting the id of the swiped row since it was deleted
              dispatch(setTodos(todos));
                setSwipedRow(null);
              }
            });
        }
            // If request failed console the error
        // if (res.data.status === "failed") {
        //   console.log(res.data)
        //    }
       // If request has an error display it 
           if (res.data.status === "error") {
            console.log(res.data)
           }
      });
  };
  // =================================================================================================get todos
  // This function will run every time the redux array changes
  const getUserTodos = () => {
    // get todos url
    const getTodosUrl = `${BASE_URL}/api/user/todos`;
    axios
      .get(getTodosUrl, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status === "success") {
          let todos = [];

          res.data.todos.map((item) => {
            todos.push({
              key: item.id,
              title: item.title,
              date: item.date,
              completed: item.completed,
            });
          });
          dispatch(setTodos(todos));
        }
      });
  };

  // ===================================================================================================
  //   Editin, if triggered this function will run and update redux states
  const handleTriggerEdit = (item) => {
    dispatch(setTodoToBeEdited(item));
    dispatch(setModalVisible(true));
    dispatch(setAddTodo(false));
    dispatch(setUpdateUsername(false))
  };
  //  ======================================================================

  // This will only run once
  useEffect(() => {
    getUserTodos();
  }, []);

  // running this function everytime the todos array changes
  useEffect(() => {
    getUserTodos();
  }, [todos]);

  // Search function
  const Search = (text) => {
    if (text) {
      // const newTodos = todos.filter((item) => {
      //   const itemData = item.title
      //     ? item.title.toUpperCase()
      //     : "".toUpperCase();
      //   const textData = text.toUpperCase();
      //   return itemData.indexOf(textData) > -1;
      // });
   
      // dispatch(setTodos(newTodos));
      setSearch(text);
    } 
    if(text == "")
    {
      const getTodosUrl = `${BASE_URL}/api/user/todos`;
      axios
        .get(getTodosUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
        
          if (res.data.status === "success") {
         
          }
             // If request failed display error on console 
             if (res.data.status === "failed") {
              console.log(res.data)
               }
       // If request has an error display error on console 
               if (res.data.status === "error") {
                console.log(res.data)
               }
        }).catch((error)=>{
          console.log(error.response.data)
        })
      // setSearch(text);
    }
  };
  // setting task as completed
  // Displaying an alert box to ask user if they would like to update the todo as todoCompleted
  // If yes it is going to the todo  and set completed to true
  const handleCompleteTask = (item) => {
    Alert.alert("Task Complete", "Have you completed the task? ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          // edit url
          const editTodoUrl = `${BASE_URL}/api/user/todos/` + item?.key;

          // edit input
          const editInput = {
            title: item.title,
            date: item.date,
            completed: true,
            active: false,
          };
// Updating the todo
          axios
            .put(editTodoUrl, editInput, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((results) => {
              // If it ha been updated we going to get all users todos
              if (results.data.status === "success") {
                // get todos url
                const getTodosUrl = `${BASE_URL}/api/user/todos`;
                axios
                  .get(getTodosUrl, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((res) => {
                    // If todos of user was found we are going to map them acccroding to the list item
                    if (res.data.status === "success") {
                      let todos = [];
              
                      res.data.todos.map((item) => {
                        todos.push({
                          key: item.id,
                          title: item.title,
                          date: item.date,
                          completed: item.completed,
                        });
                      });
                        // Setting the maped array into our redux array
                      dispatch(setTodos(todos));
                    }
                  });
              }
                // If request failed display error on console 
              if (res.data.status === "failed") {
             console.log(res.data)
              }
      // If request has an error display error on console 
              if (res.data.status === "error") {
               console.log(res.data)
              }
            });
        },
      },
    ]);
  };
  return (
    <>
      <SearchBar
        lightTheme={true}
        containerStyle={{
          backgroundColor: colors.tertiary,
          height: 40,
          borderRadius: 5,
        }}
        showCancel={false}
        cancelButtonTitle=""
        lightTheme={true}
        placeholder="Search..."
        onChangeText={(text) => Search(text)}
        value={search}
      />
      {/* display the message if todos array is empty */}
      {todos?.length == 0 && (
        <TitleView>
          <TodoTitle>Hi! {name} any plans for today?</TodoTitle>
        </TitleView>
      )}
      {/* Else display the todos */}
      {todos?.length !== 0 && (
        <SwipeListView
          data={todos}
          renderItem={({ item }) => {
            //   style the title text if row is swiped
            const RowText = item.key == swipedRow ? SwipedTodoText : TodoText;
            return (
              //   this will display the todos data
              <ListView
                onPress={() => {
                  handleTriggerEdit(item);
                }}
                onLongPress={() => {
                  handleCompleteTask(item);
                }}
                // color to show that the list has been clicked
                underlayColor={colors.primary}
              >
                <>
                  <RowText>{item?.title}</RowText>
                  <TodoDate>{item?.date}</TodoDate>
                  {item?.completed && (
                    <ErrorText style={{ color: "lightgreen" }}>
                      completed
                    </ErrorText>
                  )}
                </>
              </ListView>
            );
          }}
          renderHiddenItem={({ item, rowMap }) => (
            //   This is the underneath hidden part of a list view or a todo
            <ListViewHidden>
              {isDeleting?<ActivityIndicator style={{left:15}} animating={true} size="small" color={colors.secondary}/>:<HiddenButton
                onPress={() => {
                  handleDeleteTodo(rowMap, item.key);            
                }}
              >
                <Entypo name="trash" size={25} color={colors.secondary} />
              </HiddenButton>}
            </ListViewHidden>
          )}
          //   determines how far the list can be swipe
          leftOpenValue={80}
          //   When app opens the first todo will be swiped to show that the list are swipable
          previewRowKey={"1"}
          previewOpenValue={80}
          disableLeftSwipe={true}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingBottom: 30, marginBottom: 40, top: 10 }}
          //   set value of swiped row to
          onRowOpen={(rowKey) => {
            setSwipedRow(rowKey);
          }}
          onRowClose={() => {setSwipedRow(null),setIsDeleting(false)}}
        />
      )}
    </>
  );
};

export default ListItems;
