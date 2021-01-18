import React from "react";
import { View } from "react-native";


interface HomeProps{
  userData: {
    token: string | undefined;
  },
  formRollData: any;

}

export const Home: React.FC<HomeProps> = (props) => {

  return (<View> </View> );
}