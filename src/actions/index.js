import axios from 'axios';
import { AUTH_USER } from './types'

// dispatch: funnels through action -> middleware -> reducer
// do whatever we want inside action creator
export const register = (formProps) => dispatch => {
    axios.post('http://localhost:3000/register', formProps)
};
