import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {axiosBaseQuery} from "../../helpers/apiCall";
import {API_CATEGORY} from "../../ApiConfig";

export const tasksApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: axiosBaseQuery({baseUrl: API_CATEGORY}),
    endpoints: (builder) => ({
        getCategoriesList: builder.query({
            query: () => ({
                url: 'list',
                method: 'get',
            }),
        }),
    }),
});

export const {
    useGetCategoriesListQuery,
} = tasksApi;
