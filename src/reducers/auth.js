import { AUTH_USER, AUTH_ERROR, USER_DETAILS } from '../actions/types';

const INITIAL_STATE = {
    authentication: '',
    errorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, authenticated: action.payload };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        case USER_DETAILS:
            return { ...state, username: action.payload.username, layout: action.payload.layout }
        default:
            return state;
    }
}