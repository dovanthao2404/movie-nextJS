import { combineReducers } from 'redux';
import { userManagementReducer } from './UserManagementReducer';

const rootReducer = combineReducers({
    userManagementReducer
});

export default rootReducer;