import axios from "axios";

const BASEURL = window.location.origin;

/** Config Auth */
export const API_USER = '/api/user/';
export const requestUser = axios.create({
    baseURL: BASEURL,
    timeout: 1000,
    headers: {'content-type': 'application/json'},
});
