import {configureStore} from '@reduxjs/toolkit'
import {authSlice} from "../features/Auth/AuthSlice";
import {authApi} from "../features/Auth/AuthService";
import {setupListeners} from "@reduxjs/toolkit/query";
import {profileApi} from "../features/Profile/ProfileService";
import {profileSlice} from "../features/Profile/ProfileSlice";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        authSlice,
        profileSlice,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

