import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux"; 
import authReducer from "./auth-reducer.ts";
import chatReducer from "./chat-reducer.ts"
import profileReducer from "./profile-reducer.ts"
import userReducer from "./user-reducer.ts";
import  thunkMiddleware from "redux-thunk"
let reducers= combineReducers({
    profilePage: profileReducer, 
    chatPage: chatReducer,
    userPage: userReducer,
    auth: authReducer
})
let store = createStore(reducers, applyMiddleware(thunkMiddleware))
export default store
window.store= store;