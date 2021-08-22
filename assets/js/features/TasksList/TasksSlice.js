import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.showModal = !state.showModal;

            return state;
        },
    },
    extraReducers: (builder) => {

    },
});

export const { toggleModal } = slice.actions;
export const selectShowModal = (state) => state.tasks.showModal;
export const tasksSelector = (state) => state.tasks;
export default slice.reducer;

