import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_USER} from "../../ApiConfig";
import axios from "axios";
import {schema} from "normalizr";

const userEntity = new schema.Entity("user");

export const registerUser = createAsyncThunk(
    'user/register',
    async ({email, plainPassword}, thunkAPI) => {
        try {
            const response = await axios.post(
                API_USER + 'register',
                JSON.stringify({email, plainPassword}),
                {
                    withCredentials: true,
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
                }
            );
            let data = await response.data;

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.errors.email);
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login',
    async ({email, password}, thunkAPI) => {
        try {
            const response = await axios.post(
                API_USER + 'login',
                JSON.stringify({email, password}),
                {
                    withCredentials: true,
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
                }
            );
            let data = await response.data;

            if (response.status === 200) {
                localStorage.setItem('email', data.email);
                localStorage.setItem('roles', data.roles);
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.errors);
        }
    }
)

export const sendMailForgotPassword = createAsyncThunk(
    'user/resetPassword',
    async({email}, thunkAPI) => {
        try {
            const response = await axios.post(
                API_USER + 'reset-password/forgot-password',
                JSON.stringify({email}),
                {
                    withCredentials: true,
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
                }
            );
            let data = await response.data;

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data.errors);
        }
    }
)

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async({password, plainPassword}, thunkAPI) => {
        try {
            const response = await axios.post(
                API_USER + 'reset-password/reset-form',
                JSON.stringify({password, plainPassword}),
                {
                    withCredentials: true,
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
                }
            );
            let data = await response.data;

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data.errors);
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        roles : [],
        isAuthenticated: false,
        forgotPassword : false,
        isFetching: false,
        isRegisterSuccess: false,
        isLoginSuccess: false,
        isSendMailSuccess: false,
        isResetPasswordSuccess: false,
        isError: false,
        errorMessage: [],
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isRegisterSuccess = false;
            state.isLoginSuccess = false;
            state.isSendMailSuccess = false;
            state.isResetPasswordSuccess = false;
            state.isFetching = false;

            return state;
        },
        showForgotPasswordForm: (state) => {
            state.forgotPassword = true;

            return state;
        },
    },
    extraReducers: {
        [registerUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isRegisterSuccess = true;
            state.email = payload.email;
        },
        [registerUser.pending]: (state) => {
            state.isFetching = true;
        },
        [registerUser.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload;
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            state.email = payload.email;
            state.roles = payload.roles;
            state.isAuthenticated = true;
            state.isFetching = false;
            state.isLoginSuccess = true;

            return state;
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
        [loginUser.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload;
        },
        [sendMailForgotPassword.fulfilled]: (state) => {
            state.isSendMailSuccess = true;
            state.isFetching = false;

            return state;
        },
        [sendMailForgotPassword.pending]: (state) => {
            state.isFetching = true;
        },
        [sendMailForgotPassword.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload;
        },
        [resetPassword.fulfilled]: (state) => {
            state.isResetPasswordSuccess = true;
            state.isFetching = false;

            return state;
        },
        [resetPassword.pending]: (state) => {
            state.isFetching = true;
        },
        [resetPassword.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload;
        }
    },
});

export const { clearState, showForgotPasswordForm } = userSlice.actions;

export const userSelector = (state) => state.user;
