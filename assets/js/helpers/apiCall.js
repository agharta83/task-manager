import axios from 'axios';
import {API_PROFILE, API_USER} from "../ApiConfig";

export const apiAuth = () => {
    return axios.create({
        baseURL: API_USER,
        responseType: "json",
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        withCredentials: true,
    });
};

export const apiProfile = () => {
    const token = localStorage.getItem('token') ?? '';

    return axios.create({
        baseURL: API_PROFILE,
        responseType: "json",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Bearer': `${token}`,
        },
        withCredentials: true,
    });
};

