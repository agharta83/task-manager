import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {axiosBaseQuery} from "../../helpers/apiCall";
import {API_PROFILE} from "../../ApiConfig";

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: axiosBaseQuery({baseUrl: API_PROFILE}),
    endpoints: (builder) => ({
        getPersonalInfos: builder.query({
            query: () => ({
                url: 'personal',
                method: 'get',
            }),
        }),
        updatePersonalInfos: builder.mutation({
            query: ({...values}) => ({
                url: 'personal/update',
                method: 'post',
                data: JSON.stringify(values),
            }),
        }),
    }),
});

export const {
    useGetPersonalInfosQuery,
    useUpdatePersonalInfosMutation,
} = profileApi;
