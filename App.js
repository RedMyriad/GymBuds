/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import AboutPage from './views/AboutPage';
import LoginPage from "./views/LoginPage";
import SwipePage from "./views/SwipePage";
import ChatPage from './views/ChatPage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '647950479411-p5p4vakl9bcai9cq4md8lctksi0ri635.apps.googleusercontent.com',
});

import store from './state/store/index.js'
import { Provider } from 'react-redux'


const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen
            name="Login"
            component={LoginPage}
          />
          <Stack.Screen name="About" component={AboutPage} />
          <Stack.Screen name="Swipe" component={SwipePage} />
          <Stack.Screen name="Message" component={ChatPage}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },

  highlight: {
    fontWeight: '700',
  },
});

export default App;
