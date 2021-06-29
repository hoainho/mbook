import { createSlice } from '@reduxjs/toolkit';
export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        account: null,
        idAccount: null,
        accountEdit: {}
    },
    reducers: {
        register: (state, action) => {
            const { payload } = action
            state.account = payload
        },
        login: (state, action) => {
            const { payload } = action
            state.account = payload
        },
        logout: (state, action) => {
            state.account = {}
        },
        changePassword: (state, action) => {
            const { payload } = action
            state.account = payload
        },
        viewDetails: (state, action) => {
            const { payload } = action
            state.idAccount = payload
        },
        updateAccount: (state, action) => {
            const { payload } = action
            state.accountEdit = { ...state.accountEdit, account: payload }
        }
    },
});

export const { register, login, logout, changePassword, updateAccount, viewDetails } = accountSlice.actions;
export const selectAccount = state => state.account;

export default accountSlice.reducer;
