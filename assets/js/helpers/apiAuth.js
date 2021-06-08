import axios from 'axios';
import {API_USER} from "../ApiConfig";

const authClient = () => {

    return axios.create({
        baseURL: API_USER,
        responseType: "json",
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
        withCredentials: true,
    });
};

export default authClient;
