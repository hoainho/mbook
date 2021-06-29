import { createSlice } from '@reduxjs/toolkit';
export const posterSlice = createSlice({
    name: 'poster',
    initialState: {
        idView: null,
        posterEdit: {},
    },
    reducers: {
        viewDetails: (state, action) => {
            const { payload } = action
            state.idView = payload
        },
        updatePoster: (state, action) => {
            const { payload } = action
            state.posterEdit = { ...state.posterEdit, product: payload }
        },
    },
});

export const { viewDetails, updatePoster } = posterSlice.actions;
export const selectPoster = state => state.poster;

export default posterSlice.reducer;
