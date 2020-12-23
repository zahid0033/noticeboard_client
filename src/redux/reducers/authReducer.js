import { LOGOUT, SET_CURRENT_USER } from "../type/authTypes";
// import jwt from 'jsonwebtoken';
const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: !isEmpty(localStorage.getItem('jwtToken')),
    user: {},
    type: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                type: action.payload.type
            }
        case LOGOUT:
            localStorage.removeItem('jwtToken')
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                type: ''
            }
        default:
            return state;
    }
}

export default authReducer;