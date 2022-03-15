import axios from "axios";
import { DOMAIN } from "../utils/configs/settings";

const api = axios.create({
    baseURL: DOMAIN,
});


const onRequest = (config) => {
    config.headers = {
        ...config.headers,
    };
    return config;
};


const onRequestError = (error) => {
    return Promise.reject(error);
};



const onResponse = (response) => {
    return response;
};

const onResponseError = (error) => {
    return Promise.reject(error);
};


api.interceptors.request.use(onRequest, onRequestError);
api.interceptors.response.use(onResponse, onResponseError);

export default api;