import React, { useEffect, useState } from "react";

// styled components
import {
  HeaderView,
  HeaderButton,
  colors,
  HeaderTitle,
  UploadImageButton,
  UpdateUsernameButton,
} from "../styles/appStyles";
import { BASE_URL } from "@env";
import ProfileImage from "../assets/images/profile.png";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { selectImageUri, setAddTodo, setImageUri, setModalVisible, setTodos, setUpdateUsername, } from "../slices/todoAppSlice";
import { useSelector } from "react-redux";
import { BottomSheet, ListItem } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

const Header = ({ name, token }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  // redux
  const dispatch = useDispatch();
  const imageUri = useSelector(selectImageUri);

  // FUNCTIONS
  const handleTriggerUpdateusername = ()=> {
    dispatch(setUpdateUsername(true)),
    dispatch(setModalVisible(true)),
    dispatch(setAddTodo(null))
  }
  // ================================================================================
  // Asking user permissions
  useEffect(() => {

    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // ==============================================================================================
  // pick image function
  const handlePickImage = async () => {
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const updateImageUrl = `${BASE_URL}/api/user/updateImage`;
      const userImage ={image:result.uri}
      axios.put(updateImageUrl,userImage,{
        
          headers: { Authorization: `Bearer ${token}` },
        
      }).then((res)=>{
        
        if(res.data.status=== "success"){
          dispatch(setImageUri(result.uri));
          setIsVisible(false);
      
        }
      })
   
    }
  };

  // Logout
  const handleLogOut = () => {
    // logout url
    const logoutUrl = `${BASE_URL}/api/user/logout`;
    axios
      .get(logoutUrl, { headers: {Authorization: `Bearer ${token}`}})
      .then((res) => {
      // if user logged out
        if (res.data.status === "success") {
// naviagte user to landing screen
          navigation.replace("Landing");
          dispatch(setTodos([]));
          dispatch(setImageUri(null))
        }
         // If request failed display error on console 
        if(res.data.status === "failed") {
          console.log(res.data)
        }
         // If request has an error display error on console 
        if(res.data.status === "error") {
          console.log(res.data)
        }
      }).catch((error)=>{
        console.log(error)
      })
   
  };


  return (
    // Header view
    <HeaderView>
      <HeaderTitle>To-Do</HeaderTitle>
      <HeaderButton onPress={() => setIsVisible(true)}>
      {/* if userimage is availble display it else display defult profile image */}
        {imageUri? (
          <Image
            source={{ uri: imageUri }}
            style={{ height: 40, width: 40, borderRadius: 25 }}
          />
        ) : (
          <Image
            source={ProfileImage}
            style={{ height: 40, width: 40, borderRadius: 25 }}
          />
        )}
      </HeaderButton>
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
      >
      {/* Upload image item view */}
        <ListItem
          containerStyle={{
            backgroundColor: "white",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingBottom: 10,
          }}
        >
          <ListItem.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ListItem.Title
              style={{ fontWeight: "bold", color: colors.secondary }}
            >
              Upload Image
            </ListItem.Title>
            {/* Upload image button */}
            <UploadImageButton onPress={handlePickImage}>
              <FontAwesome5
                name="camera-retro"
                color={colors.primary}
                style={{ fontSize: 18 }}
              />
            </UploadImageButton>
          </ListItem.Content>
        </ListItem>
        {/* Username item view */}
        <ListItem containerStyle={{ backgroundColor: "white" }}>
          <ListItem.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ListItem.Title
              style={{
                fontWeight: "bold",
                color: colors.secondary,
                textTransform: "capitalize",
              }}
            >
              {name}
            </ListItem.Title>
            <UpdateUsernameButton
            onPress={handleTriggerUpdateusername}
            >
              <FontAwesome5
                name="edit"
                color={colors.primary}
                style={{ fontSize: 18 }}
              />
            </UpdateUsernameButton>
          </ListItem.Content>
        </ListItem>
{/* Logout item view */}
        <ListItem containerStyle={{ backgroundColor: "white" }}>
          <ListItem.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ListItem.Title
              style={{ fontWeight: "bold", color: colors.secondary }}
            >
              Logout
            </ListItem.Title>
            {/* Logout button */}
            <UpdateUsernameButton onPress={handleLogOut}>
              <FontAwesome5
                name="sign-out-alt"
                color={colors.primary}
                style={{ fontSize: 18 }}
              />
            </UpdateUsernameButton>
          </ListItem.Content>
        </ListItem>

        <ListItem
          containerStyle={{ backgroundColor: "red" }}
          onPress={() => {
            setIsVisible(false);
          }}
        >
          <ListItem.Content>
            <ListItem.Title
              style={{
                color: "white",
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Cancel
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </HeaderView>
  );
};

export default Header;
