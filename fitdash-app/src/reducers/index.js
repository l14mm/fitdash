import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth'
import mfp from './mfp'

export default combineReducers({
    auth,
    mfp,
    form: formReducer
});