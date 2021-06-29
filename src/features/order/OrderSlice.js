import { createSlice } from '@reduxjs/toolkit';
export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        idView: null
    },
    reducers: {
        viewDetails: (state, action) => {
            const { payload } = action
            state.idView = payload
        }
    },
});

export const { viewDetails } = orderSlice.actions;
export const selectOrder = state => state.order;

export default orderSlice.reducer;
