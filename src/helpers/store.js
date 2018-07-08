import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { alert } from '../reducers/alert.reducer';
import { authentication } from '../reducers/authentication.reducer';
import { registration } from '../reducers/registration.reducer';
import { users } from '../reducers/users.reducer';

const rootReducer = combineReducers({
  alert,
  authentication,
  registration,
  users
})

const loggerMiddleware = createLogger();
 
export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);