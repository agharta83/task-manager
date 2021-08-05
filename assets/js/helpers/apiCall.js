import axios from 'axios';
import {API_PROFILE, API_USER} from "../ApiConfig";

export const apiProfile = () => {
    const isAuth = localStorage.getItem('isLogged');

    if (isAuth) {
        return axios.create({
            baseURL: API_PROFILE,
            responseType: "json",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    }
};

export const axiosBaseQuery =
    ({baseUrl} = {baseUrl: ''}) =>
    async ({url, method, data}) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                responseType: "json",
            })
            return {data: result.data};
        } catch (axiosError) {
            let err = axiosError;
            return {
                error: {status: err.response?.status, data: err.response?.data},
            }
        }
    }

