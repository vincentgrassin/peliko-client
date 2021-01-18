
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { Home } from './src/screens/home'
import { Notifications } from './src/screens/notifications'


const stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer> 
      <stack.Navigator>
        <stack.Screen name='Home' component={Home} options={{title:'Vos pelliko'}} />
        <stack.Screen name='Notifications' component={Notifications} options={{title:'notif pelli'}} />
      </stack.Navigator>
    </NavigationContainer>
  );
}