import {createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser, registerUser, resetPassword, sendMailForgotPassword} from "./authThunk";

export const authSlice = createSlice({
    name: 'auth',
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

export const { clearState, showForgotPasswordForm } = authSlice.actions;

export const authSelector = (state) => state.auth;
