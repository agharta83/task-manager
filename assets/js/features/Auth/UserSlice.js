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
            console.log(response.status === 200);
            let data = await response.data;

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            console.log('la', error);
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
                // localStorage.setItem('token', data.token);
                console.log(data);
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
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        },
    },
    extraReducers: {
        [registerUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
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
            state.isFetching = false;
            state.isSuccess = true;

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
