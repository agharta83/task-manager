import {configureStore} from '@reduxjs/toolkit'
import {userSlice} from "../features/Auth/UserSlice";

export default configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

