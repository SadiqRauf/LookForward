import {StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import Navigator from './src/navigation/Navigations';
import {Provider} from 'react-redux';
// import { Colors } from "./common/Colors";
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from './src/config/Colors';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/redux/store';

let persistor = persistStore(store);
const App = ({navigation}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView
          style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
          <View style={{flex: 1}}>
            <StatusBar barStyle="light-content" backgroundColor={'#000'} />
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
