import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

const stackNavigatorHome = createStackNavigator(
  {
    Home: Home,
    // Roll: Roll,
    // Gallery:Gallery,
    // FullRoll:FullRoll,
    // Cam:Cam,
    // MasterForm:MasterForm,
    // joinRoll:joinRoll,
    // MyAccount:MyAccount,
    // MyPassword:MyPassword,
    MasterParameters:MasterParameters
}, {headerMode: 'none',});


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
