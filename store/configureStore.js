import {createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import favReducer from './reducers/favReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export default createStore(persistReducer(persistConfig, favReducer));
