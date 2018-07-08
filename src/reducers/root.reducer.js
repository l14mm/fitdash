import { combineReducers } from 'redux';
import { alert } from "./alert.reducer";
import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";

const rootReducer = combineReducers({
    alert,
    authentication,
    registration,
    users
});

export default rootReducer;