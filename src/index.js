import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/reducers/rootReducers";
import jwt_decode from "jwt-decode";
import axios from 'axios';
import setAuthToken from "./utils/setAuthToken";
import setCurrentUser from "./redux/actions/setCurrentUser";
import logoutUser from "./redux/actions/authActions"
import 'bootstrap/dist/css/bootstrap.min.css';

const { REACT_APP_NOT_AXIOS_BASE_URL } = process.env;
axios.defaults.baseURL = REACT_APP_NOT_AXIOS_BASE_URL;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000;
    // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Redirect to home
        window.location.href = "./";
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
