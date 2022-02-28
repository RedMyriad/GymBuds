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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const App = () => {

  return (
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
      </Stack.Navigator>
    </NavigationContainer>
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
