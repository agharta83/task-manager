import {createSlice} from "@reduxjs/toolkit";
import {profileApi} from "./ProfileService";

const initialState = {
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
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(profileApi.endpoints.getPersonalInfos.matchFulfilled, (state, {payload}) => {
                state.personalInfos = {...payload};
            })
            .addMatcher(profileApi.endpoints.updatePersonalInfos.matchFulfilled, (state, {payload}) => {
                state.personalInfo = {...payload};
            })
    },
});

export const profileSelector = (state) => state.profile;
