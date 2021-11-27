import React from "react";
// importing components directory
import Header from "../components/Header";
import ListItems from "../components/ListItems";
import InputModal from "../components/InputModal";
import { StatusBar } from "expo-status-bar";

// styled component
import { Container } from "../styles/appStyles";

const HomeScreen = ({route}) => {
// redux

  return (
       // wrapped the components in a react fragament(empty angle brackets) because react components are supposed to have one route component
    <Container>
     <StatusBar style="dark" />
     {/* Passing name,token,id into Header,ListItems and inputModal components */}
      <Header name={route.params?.name} token={route.params?.token} id={route.params?.id} image={route.params?.image}/>
      <ListItems name={route.params?.name} token={route.params?.token} id={route.params?.id} image={route.params?.image}/>
      <InputModal name={route.params?.name} token={route.params?.token} id={route.params?.id} image={route.params?.image}/>
    </Container>
  );
};

export default HomeScreen;

