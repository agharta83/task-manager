import {configureStore} from '@reduxjs/toolkit'
import auth from "../features/Auth/AuthSlice";
import {authApi} from "../features/Auth/AuthService";
import {setupListeners} from "@reduxjs/toolkit/query";
import {profileApi} from "../features/Profile/ProfileService";
import profile from "../features/Profile/ProfileSlice";
import StateCacheStorage from "../helpers/StateCacheStorage";
import {tasksApi} from "../features/TasksList/TasksService";

const initialState = StateCacheStorage.get("APP_STATE");

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        auth,
        profile,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware, tasksApi.middleware),
    preloadedState: initialState
});

store.subscribe(() => {
    StateCacheStorage.set("APP_STATE", store.getState());
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

