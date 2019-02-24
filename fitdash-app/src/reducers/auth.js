import { AUTH_USER, AUTH_ERROR, USER_DETAILS, API_ERROR } from '../actions/types';

const INITIAL_STATE = {
    authentication: '',
    errorMessage: '',
    apiErrorMessage: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, authenticated: action.payload };
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        case USER_DETAILS:
            return { ...state, username: action.payload.username, layout: action.payload.layout, mfpUsername: action.payload.mfpUsername }
        case API_ERROR:
            return { ...state, apiErrorMessage: action.payload }
        default:
            return state;
    }
}