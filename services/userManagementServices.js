import api from "./baseApiServices";

class UserManagementServices {
    login = (info) => {
        return api.post('/api/v1/auth/login', info);
    };
}
export const userManagementServices = new UserManagementServices();