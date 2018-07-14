import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, USER_DETAILS } from './types'

// dispatch: funnels through action -> middleware -> reducer
// do whatever we want inside action creator
export const register = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3000/register', formProps);
        // Send to middlewares and reducers
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Username already exists" })
    }
};

export const login = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3000/login', formProps);
        // Send to middlewares and reducers
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Invalid login details" })
    }
};

export const getUserDetails = (callback) => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3000/userDetails', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${localStorage.getItem('token')}`,
            }
        });
        // Send to middlewares and reducers
        console.log(response.data);
        dispatch({ type: USER_DETAILS, payload: response.data });
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Invalid login details" })
    }
};

export const logout = () => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${localStorage.getItem('token')}`,
        }
    };
    const data = {
        'layout': localStorage.getItem('dashboard-layout')
    };
    axios.post('http://localhost:3000/saveLayout', data, headers);
    localStorage.clear();

    return {
        // toggles
        type: AUTH_USER,
        payload: ''
    }
} 