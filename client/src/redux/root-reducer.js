import {combineReducers} from "redux"; 
import {persistReducer} from "redux-persist"; 
import storage from 'redux-persist/lib/storage';
import userReducer from "./user/user.reducer.js";
import systemReducer from "./system/system.reducer.js"; 
import eventsReducer from "./events/events.reducer.js";


const persistConfig = {
    key: "root",
    storage,
    whitelist:["cart","user"],
};


const rootReducer = combineReducers(
    {
        system:systemReducer,
        user:userReducer,
        events:eventsReducer,
    }
);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer; 