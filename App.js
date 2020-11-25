import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import store from './store/configureStore';
import BottomTabNav from './navigation/BottomTabNav';

const App = () => {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <BottomTabNav />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
