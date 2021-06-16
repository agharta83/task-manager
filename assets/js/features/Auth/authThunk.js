import {createAsyncThunk} from "@reduxjs/toolkit";
import apiAuth from "../../helpers/apiAuth";
import {useHistory} from "react-router";


export const registerUser = createAsyncThunk(
    'user/register',
    async ({email, plainPassword}, thunkAPI) => {
        try {
            const response = await apiAuth().post(
                'register',
                JSON.stringify({email, plainPassword})
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
            const response = await apiAuth().post(
                'login',
                JSON.stringify({email, password}),
            );
            let data = await response.data;

            if (response.status === 200) {
                localStorage.setItem('isLogged', data.isLogged);
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
            const response = await apiAuth().post(
                'reset-password/forgot-password',
                JSON.stringify({email}),
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
            const response = await apiAuth().post(
                'reset-password/reset-form',
                JSON.stringify({password, plainPassword}),
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

export const logoutUser = () => {
    apiAuth().get('logout')
        .then((response) => {
            localStorage.removeItem(('isLogged'));
            history.push('/auth');
        })
        .catch((error) => {
            console.log(error);
        });
}
