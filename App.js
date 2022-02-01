import React from 'react';
import { Text, StatusBar } from "react-native";
import Investimentos from './src/screens/Investimentos';


export default function App(){
  return(
    <>  
      <StatusBar barStyle="light-content"/>
      <Investimentos/>

    </>
  )
};

