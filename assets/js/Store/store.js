import {configureStore} from '@reduxjs/toolkit'
import {authSlice} from "../features/Auth/AuthSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

