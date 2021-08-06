import {createSlice} from "@reduxjs/toolkit";
import {authApi} from "./AuthService";

const initialState = {
    user: {
        userName: null,
        imagePath: null,
    },
    isAuthenticated: false,
    forgotPassword: false,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        showForgotPasswordForm: (state) => {
            state.forgotPassword = true;

            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, {payload}) => {
                state.isAuthenticated = payload?.isLogged;
                state.user.userName = payload?.userName;
                state.user.imagePath = payload?.imagePath;
            })
            .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state, {payload}) => {
                state = initialState;

                return state;
            })
    },
});

export const { showForgotPasswordForm, logout } = slice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserInfos = (state) => state.auth.user;
export const authSelector = (state) => state.auth;
export default slice.reducer;
