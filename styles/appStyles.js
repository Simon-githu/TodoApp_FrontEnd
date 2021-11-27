import styled from "styled-components";
import Constants from "expo-constants";


// Colors
export const colors = {
  primary: "white",
  secondary: "#1a5932",
  tertiary: "#E6E6E6",
  alternative: "#999999",
  error:"#ff3333"
};

// status bar stays the same
const statusBarHeight = Constants.statusBarHeight;

export const Container = styled.SafeAreaView`
  background-color: ${colors.primary};
  padding: 20px;
  padding-bottom: 0px;
  flex: 1;
  padding-top: ${statusBarHeight}px;
`;

// Header styles
export const HeaderView = styled.View`
  padding-vertical: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: ${colors.secondary};
  letter-spacing: 2px;
  font-style: italic;
`;
export const HeaderButton = styled.TouchableOpacity`
  font-weight: bold;
  color: ${colors.tertiary};
`;

// List styles
export const ListContainer = styled.View`
  margin-bottom: 30px;
  flex: 1;
  padding-bottom: 40px;
`;

export const ListView = styled.TouchableHighlight`
  background-color: ${colors.secondary};
  min-height: 85px;
  width: 100%;
  padding: 15px;
  justify-content: space-around;
  margin-bottom: 15px;
  border-radius: 10px;
`;

export const ListViewHidden = styled.View`
  background-color: ${colors.tertiary};
  min-height: 85px;
  width: 100%;
  padding: 15px;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 15px;
  border-radius: 11px;
`;

export const HiddenButton = styled.TouchableOpacity`
  width: 55px;
  align-items: center;
`;

export const TodoText = styled.Text`
  font-size: 16px;
  letter-spacing: 1px;
  color: ${colors.tertiary};
  
  `;
export const TodoTitle = styled.Text`
font-size: 16px;
letter-spacing: 1px;
color: ${colors.alternative};
text-transform: capitalize;
`;
export const TitleView = styled.View`
flex:1;
align-items: center;
justify-content: center;
`;
export const TodoDate = styled.Text`
  font-size: 10px;
  letter-spacing: 1px;
  color: ${colors.alternative};
  text-align: right;
  text-transform: uppercase;
`;

// Text for swiped todo row
export const SwipedTodoText = styled(TodoText)`
  color: ${colors.alternative};
  font-style: italic;
  text-decoration: line-through;
`;

// Modal styles
export const ModalButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${colors.tertiary};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: absolute;
  bottom: 15px;
`;

export const ModalContainer = styled.View`
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${colors.secondary};
  
`;

export const ModalView = styled.ImageBackground`
  padding: 20px;
`;

export const StyledInput = styled.TextInput`
  width: 300px;
  height: 50px;
  background-color: ${colors.tertiary};
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  color: ${colors.secondary};
  letter-spacing: 1px;
`;

export const ModalAction = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const ModalActionGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
`;

export const ModalIcon = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

// Landing Styles
export const LandingBackgroundImage = styled.ImageBackground`
   width:100%;
    height:280px;
`;
export const CredentialsView = styled.ImageBackground`
    width: 300px;
    height: 450px;
    background-color:${colors.primary} ;
    align-items: center;
    align-self: center;
    bottom: 40px;
    border-radius: 20px;
    padding:20px
    
`;

export const LandingTitle = styled.Text`

`;
export const LandingText = styled.Text`
color:${colors.alternative};
top:30px
`;
// Landing Login Button
// show login is a state passed from parent component 
export const LoginButtonView = styled.TouchableOpacity`
width:100px;
background-color: ${(props)=>props.showLogin?colors.secondary:colors.primary};
height:35px;
border-top-left-radius: 20px;
border-bottom-left-radius:20px;
align-items: center;
justify-content: center;
border-width: ${(props)=>!props.showLogin?1:0}px;
border-color: ${(props)=>!props.showLogin?colors.secondary:colors.primary};
`;
export const LoginButtonText = styled.Text`
  color: ${(props)=>props.showLogin?colors.primary:colors.secondary};
  font-weight: bold;

`;
export const RegisterButtonView = styled.TouchableOpacity`
width:100px;
background-color: ${(props)=>!props.showLogin?colors.secondary:colors.primary};
height:35px;
border-top-right-radius: 20px;
border-bottom-right-radius:20px;
align-items: center;
justify-content: center;
border-width: ${(props)=>props.showLogin?1:0}px;
border-color:${(props)=>props.showLogin?colors.secondary:colors.primary};


`;
export const RegisterButtonText = styled.Text`
  color: ${(props)=>!props.showLogin?colors.primary:colors.secondary};
  font-weight: bold;

`;
export const ButtonView =styled.View`
flex-direction:row;

`;

// Login styles
export const LoginView =styled.View`
align-items:center;
justify-content: center;
flex:1;
width:100%
`
export const LoginText = styled.Text`
color: ${colors.alternative};
margin-top:40px;
margin-bottom: 30px;
`;
export const SubmitButton =styled.TouchableOpacity`
   padding: 10px;
    background-color: ${colors.secondary};
    border-radius: 10px;
    width: 150px;
    align-items: center;
    justify-content: center;
    top: 10px;
`;
export const SubmitButtonText =styled.Text`
color: ${colors.primary};
font-weight: bold;
`;
export const ErrorText=styled.Text`
color:${colors.error};
font-size:11px;

`;

// Register styles
export const RegisterView = styled.View`
align-items: center;
justify-content: center;
flex:1;
width:100%
`
export const RegisterText =styled.Text`
color: ${colors.alternative};
margin-top:30px;
margin-bottom: 20px;
`;
export const SplashView =styled.View`
background-color: ${colors.secondary};
flex:1
`;

export const UploadImageButton=styled.TouchableOpacity`
background-color: ${colors.secondary};
padding:10px;
border-radius:5px;

`;


export const UpdateUsernameButton=styled.TouchableOpacity`
background-color: ${colors.secondary};
padding:10px;
border-radius:5px;

`;

