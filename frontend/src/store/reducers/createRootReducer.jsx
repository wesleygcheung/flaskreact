import { combineReducers } from "redux";

const initialState = {isLoggedIn: false,menuColored: true};
export const authReducer = (state=initialState, action={}) =>{
    switch (action.type) {
        case 'login':
            return {...state,isLoggedIn: true};
        case 'logout':
            return {...state,isLoggedIn: false};
        case 'changeColor':
            return {...state,menuColored: action.payload};
        default:
            return state
    }
}

export const createRootReducer = () => {
    return combineReducers({authReducer: authReducer})
}