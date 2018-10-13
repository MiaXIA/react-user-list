import { combineReducers } from 'redux';
import users from './users';
import modifyUser from './modifyUser';

const reducers = combineReducers({
    users,
    modifyUser
});

export default reducers;