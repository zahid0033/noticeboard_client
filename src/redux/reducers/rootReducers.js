import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    auth : authReducer,
    errors: errorReducer
})

const store = createStore(rootReducer,{},applyMiddleware(thunk));

export default store;