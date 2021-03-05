import React from "react";
import { View, Text, Button } from "react-native";

interface LoginProps {
  navigation: any;
}

const Login: React.FC<LoginProps> = ({ navigation }) => (
  <View>
    <Text>Login</Text>
    <Button
      title="Go Home"
      onPress={() => navigation.navigate("BottomNavigation")}
    />
  </View>
);

export default Login;
