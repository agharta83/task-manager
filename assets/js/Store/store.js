import {configureStore} from '@reduxjs/toolkit'
import {authSlice} from "../features/Auth/AuthSlice";
import {profileSlice} from "../features/Profile/ProfileSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        profile: profileSlice.reducer,
    },
});

