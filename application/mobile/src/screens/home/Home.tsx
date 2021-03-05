import React from "react";
import { View, Text } from "react-native";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({ ...props }) => (
  <View>
    <Text>Home</Text>
  </View>
);

export default Home;
