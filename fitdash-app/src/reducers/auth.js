import { AUTH_USER, AUTH_ERROR, USER_DETAILS, USER_DETAILS_MFP, USER_DETAILS_MFP_MEALS } from '../actions/types';

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
            return { ...state, username: action.payload.username, layout: action.payload.layout, mfpUsername: action.payload.mfpUsername }
        case USER_DETAILS_MFP:
            return { ...state,  mfp: action.payload }
        case USER_DETAILS_MFP_MEALS:
            return { ...state,  mfpMeals: action.payload }
        default:
            return state;
    }
}