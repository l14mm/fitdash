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
                'Authorization': localStorage.getItem('token'),
            }
        });
        // Send to middlewares and reducers
        dispatch({ type: USER_DETAILS, payload: response.data.username });
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Invalid login details" })
    }
};

export const logout = (callback) => async dispatch => {
    try {
        const layout = localStorage.getItem("dashboard-layout") || "no layout";
        console.log('token: ' + localStorage.getItem('token'));
        const response = axios.post('http://localhost:3000/saveLayout', {
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjQzMzBmMWUzNzllZjExZjY5ODg3NTkiLCJpYXQiOjE1MzExMzAwOTczOTN9.qnj2JgRaGqaIuChA3knsbGPKgTSyq2QJ-tYMWFekghE',
                'Content-Type': 'application/json',
            },
            body: {
                layout: 'mylayout1233'
            }
        }
    );
        console.log('response: ')
        console.log(response)


        // return {
        //     // toggles
        //     type: AUTH_USER,
        //     payload: ''
        // }
        // callback();
    } catch (e) {
        localStorage.removeItem('token');
        // dispatch({ type: AUTH_ERROR, payload: "Username already exists" })
    }

    localStorage.removeItem('token');

}