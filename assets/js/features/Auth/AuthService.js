import {createApi} from '@reduxjs/toolkit/query/react';
import {API_USER} from "../../ApiConfig";
import {axiosBaseQuery} from "../../helpers/apiCall";

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery({baseUrl: API_USER}),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: ({email, plainPassword}) => ({
                url: 'register',
                method: 'post',
                data: JSON.stringify({email, plainPassword}),
            }),
        }),
        loginUser: builder.mutation({
            query: ({email, password}) => ({
                url: 'login',
                method: 'post',
                data: JSON.stringify({email, password}),
            }),
        }),
        sendMailForgotPassword: builder.mutation({
            query: ({email}) => ({
                url: 'reset-password/forgot-password',
                method: 'post',
                data: JSON.stringify({email}),
            }),
        }),
        resetPassword: builder.mutation({
            query: ({password, plainPassword}) => ({
                url: 'reset-password/reset-form',
                method: 'post',
                data: JSON.stringify({password, plainPassword}),
            }),
        }),
        logoutUser: builder.query({
            query: () => ({
                url: 'logout',
                method: 'get'
            }),
        }),
    }),

})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useSendMailForgotPasswordMutation,
    useResetPasswordMutation,
    useLogoutUserQuery,
} = authApi;
