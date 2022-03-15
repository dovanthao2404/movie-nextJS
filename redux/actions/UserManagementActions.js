import { routerString } from "../../routers/routerString";
import { userManagementServices } from "../../services/userManagementServices";
import { USER_LOGIN } from "../../utils/configs/settings";

export const LOGIN_REQUEST = "@user/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "@user/LOGIN_SUCCESS";
export const LOGIN_FAILED = "@user/LOGIN_FAILED";


export const actLoginAdmin = (info, router) => {
    return async dispatch => {
        try {
            dispatch(actLoginRequest());
            const result = await userManagementServices.login(info);
            if (result.data.info.roles === "ADMIN") {
                localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
                dispatch(actLoginSuccess(result.data));
                router.push(routerString.Dashboard);
            } else {
                const error = {
                    response: {
                        data: {
                            message: "Not have access"
                        }
                    }
                };
                throw error;
            }
        } catch (error) {
            dispatch(actLoginFailed(error));
        }
    };
};

const actLoginRequest = () => ({
    type: LOGIN_REQUEST
});

const actLoginFailed = (error) => ({
    type: LOGIN_FAILED,
    payload: error
});
const actLoginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
});

