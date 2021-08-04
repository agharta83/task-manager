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
            loaded: {
                personalInfo: false,
            }
        }
    },
    reducers: {
        setUserName: (state, {payload}) => {
            state.personalInfo.userName = payload;
        },
        setImagePath: (state, {payload}) => {
            state.personalInfo.imagePath = payload;
        }
    },
    extraReducers: {
        [getPersonalInfo.fulfilled]: (state, {payload}) => {
            state.personalInfo = {...payload};
            state.global.isSuccess = true;
            state.global.isFetching = false;
            state.global.loaded.personalInfo = true;
        },
        [getPersonalInfo.pending]: (state) => {
            state.global.isFetching = true;
            state.global.loaded.personalInfo = false;
        },
        [getPersonalInfo.rejected]: (state, {payload}) => {
            state.global.isError = true;
            state.global.errorMessage = payload;
            state.global.loaded.personalInfo = false;
            state.global.isFetching = false;
        },
        [updatePersonalInfos.fulfilled]: (state, {payload}) => {
            state.personalInfo = {...payload};
            state.global.isSuccess = true;
            state.global.isFetching = false;
        },
        [updatePersonalInfos.pending]: (state) => {
            state.global.isFetching = true;
        },
        [updatePersonalInfos.rejected]: (state, {payload}) => {
            state.global.isError = true;
            state.global.errorMessage = payload;
            state.global.isFetching = false;
        }
    },
});

export const profileSelector = (state) => state.profile;

export const personalInfosSelector = (state => state.profile.personalInfo);
export const globalProfileSelector = (state => state.profile.global);

export const { setUserName, setImagePath } = profileSlice.actions;
