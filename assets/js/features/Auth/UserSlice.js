import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_USER} from "../../ApiConfig";
import axios from "axios";

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
            console.log(response);
            let data = await response.data;

            if (response.status === 200) {
                localStorage.setItem('email', data.email);
                localStorage.setItem('roles', data.roles);
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue((error.response.data.errors));
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        roles : [],
        isFetching: false,
        isRegisterSuccess: false,
        isLoginSuccess: false,
        isError: false,
        errorMessage: [],
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isRegisterSuccessSuccess = false;
            state.isLoginSuccessSuccess = false;
            state.isFetching = false;

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
            state.username = payload.username;
            state.roles = payload.roles;
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
        }
    },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
