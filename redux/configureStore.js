import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { cities } from "./cities";
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export const ConfigureStore = () => {


    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }

    const store = createStore(
        persistCombineReducers(config, {
            cities
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store)

    return { persistor, store };
}

