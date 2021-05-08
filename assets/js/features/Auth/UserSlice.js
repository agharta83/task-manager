import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {API_USER, requestUser} from "../../ApiConfig";

export const registerUser = createAsyncThunk(
    'user/register',
    async ({email, password}, thunkAPI) => {
        try {
            console.log('request data :', email, password);
            const response = await requestUser.post(API_USER + 'register', JSON.stringify(email, password));
            let data = await response.json();

            if (response.status === 200) {
                localStorage.setItem('token', data.token);
                return {...data, email: email};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            console.log('Error', error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
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
            console.log('payload :', payload);
            state.isFetching = false;
            state.isSuccess = true;
            state.email = payload.user.email;
        },
        [registerUser.pending]: (state) => {
            state.isFetching = true;
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        }},
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;
