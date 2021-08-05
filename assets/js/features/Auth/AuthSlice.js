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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        showForgotPasswordForm: (state) => {
            state.forgotPassword = true;

            return state;
        },
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.loginUser.matchFulfilled, (state, {payload}) => {
                state.isAuthenticated = payload?.isLogged;
                state.user.userName = payload?.userName;
                state.user.imagePath = payload?.imagePath;
            })
            .addMatcher(authApi.endpoints.logoutUser.matchFulfilled, (state, action) => {
                action.logout();
            })
    },
});

export const { showForgotPasswordForm } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const authSelector = (state) => state.auth;
export default authSlice.reducer;
