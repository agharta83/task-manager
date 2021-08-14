import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {axiosBaseQuery} from "../../helpers/apiCall";
import {API_TASKS} from "../../ApiConfig";

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: axiosBaseQuery({baseUrl: API_TASKS}),
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        getCategoriesList: builder.query({
            query: () => ({
                url: 'list-categories',
                method: 'get',
            }),
        }),
        getStatusList: builder.query({
            query: () => ({
                url: 'list-status',
                method: 'get',
            }),
        }),
        addTodo: builder.mutation({
            query: ({ ...values }) => ({
                url: 'create',
                method: 'post',
                data: JSON.stringify(values),
            })
        })
    }),
});

export const {
    useGetCategoriesListQuery,
    useGetStatusListQuery,
    useAddTodoMutation,
} = tasksApi;
