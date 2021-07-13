import {createSlice} from "@reduxjs/toolkit";
import {getPersonalInfo} from "./profileThunk";


export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        personalInfo: {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            isActif: '',
        },
        payment: {},
        subscription: {},
        privacy: {},
        settings: {},
        global: {
            isSuccess: false,
            isFetching: false,
            isError: false,
            errorMessage: '',
        }
    },
    reducers: {},
    extraReducers: {
        [getPersonalInfo.fulfilled]: (state, {payload}) => {
            state.personalInfo.userName = payload.userName;
            state.personalInfo.firstName = payload.firstName;
            state.personalInfo.lastName = payload.lastName;
            state.personalInfo.email = payload.email;
            state.personalInfo.password = payload.password;
            state.personalInfo.isActif = payload.isActif;
            state.global.isSuccess = true;
        },
        [getPersonalInfo.pending]: (state) => {
            state.global.isFetching = true;
        },
        [getPersonalInfo.rejected]: (state, {payload}) => {
            state.global.isError = true;
            state.global.errorMessage = payload;
        }
    },
});

export const profileSelector = (state) => state.profile;

export const personalInfosSelector = (state => state.profile.personalInfo);
