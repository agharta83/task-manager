import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
    openDrawer: false,
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.showModal = !state.showModal;

            return state;
        },
        toggleDrawer: (state) => {
            state.openDrawer = !state.openDrawer;

            return state;
        }
    },
    extraReducers: (builder) => {

    },
});

export const { toggleModal, toggleDrawer } = slice.actions;
export const selectShowModal = (state) => state.tasks.showModal;
export const selectOpenDrawer = (state) => state.tasks.openDrawer;
export const tasksSelector = (state) => state.tasks;
export default slice.reducer;

