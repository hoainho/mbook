import { createSlice } from '@reduxjs/toolkit';
export const productSlice = createSlice({
    name: 'product',
    initialState: {
        productEdit: {},
        productList: [],
        productByAuthor: [],
        productFilter: []
    },
    reducers: {
        productReceived: (state, action) => {
            const { payload } = action
            state.productList = payload;
            state.productFilter = payload;
        },
        update: (state, action) => {
            const { payload } = action
            state.productEdit = { ...state.productEdit, product: payload }
        },
        filter: (state, action) => {
            console.log({ filter: state.productList });
            if (action.payload === "0") {
                state.productFilter = state.productList
            } else if (action.payload === "1") {
                state.productFilter = []
                state.productList.map(item => {
                    if (item.hot === true) {
                        state.productFilter.push(item);
                    }
                })
            } else if (action.payload === "2") {
                state.productFilter = []
                state.productList.map(item => {
                    if (item.sale === true) {
                        state.productFilter.push(item);
                    }
                })
            } else if (action.payload.type === "category") {
                state.productFilter = []
                state.productList.map(item => {
                    if (item.categoryProducts[0]?.idCategoryNavigation?.name === action.payload.value) {
                        console.log(item.categoryProducts[0]?.idCategoryNavigation?.name);
                        console.log("true");
                        state.productFilter.push(item);
                    } else if (action.payload.value === "all") {
                        state.productFilter = state.productList
                    }
                })
            } else if (action.payload.type === "author") {
                state.productFilter = []
                state.productList.map(item => {
                    if (item.idAuthorNavigation?.name === action.payload.value) {
                        state.productFilter.push(item);
                    } else if (action.payload.value === "all") {
                        state.productFilter = state.productList
                    }
                })
            } else if (action.payload.type === "price") {
                state.productFilter = []
                state.productList.map(item => {
                    let price = item.priceSale ? item.priceSale : item.priceOld
                    if (price >= action.payload.value[0]
                        && price <= action.payload.value[1]) {
                        console.log("name :", item.name, " - ", price);
                        state.productFilter.push(item);
                        console.log("true"); console.log(action.payload.value[0]); console.log(action.payload.value[1]);
                    }
                })
            }
        },
        findByAuthor: (state, action) => {
            state.productList.map(item => {
                if (item.idAuthorNavigation?.id === action.payload) {
                    state.productByAuthor.push(item);
                }
            })
        }
    },
});

export const { update, productReceived, filter, findByAuthor } = productSlice.actions;
export const selectProduct = state => state.product;

export default productSlice.reducer;
