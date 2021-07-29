import {createSlice} from "@reduxjs/toolkit";
import {getPersonalInfo, updatePersonalInfos} from "./profileThunk";


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
            imagePath: '',
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
    reducers: {
        setUserName: (state, payload) => {
            state.personalInfo.userName = payload;
        },
        setImagePath: (state, payload) => {
            state.personalInfo.imagePath = payload;
        }
    },
    extraReducers: {
        [getPersonalInfo.fulfilled]: (state, {payload}) => {
            state.personalInfo = {...payload};
            state.global.isSuccess = true;
        },
        [getPersonalInfo.pending]: (state) => {
            state.global.isFetching = true;
        },
        [getPersonalInfo.rejected]: (state, {payload}) => {
            state.global.isError = true;
            state.global.errorMessage = payload;
        },
        [updatePersonalInfos.fulfilled]: (state, {payload}) => {
            state.personalInfo = {...payload};
            state.global.isSuccess = true;
        },
        [updatePersonalInfos.pending]: (state) => {
            state.global.isFetching = true;
        },
        [updatePersonalInfos.rejected]: (state, {payload}) => {
            state.global.isError = true;
            state.global.errorMessage = payload;
        }
    },
});

export const profileSelector = (state) => state.profile;

export const personalInfosSelector = (state => state.profile.personalInfo);

export const { setUserName, setImagePath } = profileSlice.actions;
