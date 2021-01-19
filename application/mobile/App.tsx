
import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {View} from 'react-native'
import {MainTabView} from './src/navigation'

export default function App() {
  // TODO: add some footer
  return (
    <View>
      <MainTabView />
    </View>
  );
}