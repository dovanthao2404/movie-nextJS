import { LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS } from "../actions/UserManagementActions";

const initial = {
    userLogin: null,
    isLoading: false,
    error: null
};

export const userManagementReducer = (state = initial, { payload, action }) => {
    switch (action) {
        case LOGIN_REQUEST:
            state.userLogin = null;
            state.isLoading = true;
            state.error = null;
            return { ...state };

        case LOGIN_SUCCESS:
            state.userLogin = payload;
            state.isLoading = false;
            state.error = null;
            return { ...state };

        case LOGIN_FAILED:
            state.userLogin = null;
            state.isLoading = false;
            state.error = payload;
            return { ...state };

        default:
            return { ...state };
    }
};