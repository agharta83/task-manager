import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiProfile} from "../../helpers/apiCall";

export const getPersonalInfo = createAsyncThunk(
    'profile/personal',
    async (thunkAPI) => {
        try {
            const response = await apiProfile().get(
                'personal',
            );
            let data = await response.data;

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updatePersonalInfos = createAsyncThunk(
    'profile/personal/update',
    async ({...values}, thunkAPI) => {
        console.log(values);
        try {
            const response = await apiProfile().post(
                'personal/update',
                JSON.stringify(values),
            );
            let data = await response.data;

            if (response.status === 200) {
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
