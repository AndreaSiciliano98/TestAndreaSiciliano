import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponents';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

const { persistor, store } = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Main />
        </PersistGate>
      </Provider>
    );
  }
}

