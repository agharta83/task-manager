import {createSlice} from "@reduxjs/toolkit";
import {profileApi} from "./ProfileService";

const initialState = {
    payment: {},
    subscription: {},
    privacy: {},
    settings: {},
}

const slice = createSlice({
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
export default slice.reducer;
