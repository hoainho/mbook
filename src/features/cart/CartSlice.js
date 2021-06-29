import { useEffect, useState } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import requestAPI from '../../api/index';
import notificationCustom from '../../notification/index';

const initState = {
    listProduct: [],
    totalPrice: 0
}
export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        numberCart: 0,
        Carts: initState,
        DiscountMoney: []
    },
    reducers: {
        addToCart: (state, action) => {
            console.log({ payload: action.payload });
            if (state.Carts.listProduct.length > 0) {
                let check = false;
                state.Carts.listProduct.map((item, key) => {
                    if (item.id == action.payload.id) {
                        state.Carts.listProduct[key].quantity += action.payload.quantity;
                        state.Carts.totalPrice += (item.pricePresent ? item.pricePresent : item.priceOld) * action.payload.quantity
                        check = true
                        console.log('1');
                    }
                })
                if (!check) {
                    state.Carts.totalPrice = state.Carts.totalPrice + (action.payload.pricePresent ? action.payload.pricePresent : action.payload.priceOld) * action.payload.quantity
                    state.Carts?.listProduct.push(action.payload)
                    console.log('2');

                }
            } else {
                console.log('3');
                state.Carts.listProduct.push(action.payload)
                state.Carts.totalPrice = (action.payload.pricePresent ? action.payload.pricePresent : action.payload.priceOld) * action.payload.quantity
            }
            const dataFormat = { idProduct: action.payload.id, quantity: action.payload.quantity }
            requestAPI(`/cart/upload`, 'POST', dataFormat, { Authorization: `Bearer-${localStorage.getItem('TOKEN')}` })
                .then(res => {
                    if (res) {
                        notificationCustom("Thông Báo", `Thêm Sản Phẩm thành công  `, "success")
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 403) {
                            notificationCustom("Nhắc Nhở", `Vui lòng đăng nhập để thực hiện chức năng này`, "warning")
                        }
                        if (err.response.status === 500) {
                            notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
                        }
                    }
                })
            state.numberCart += action.payload.quantity
        },
        deleteItem: (state, action) => {
            var index = state.Carts.listProduct ? state.Carts.listProduct.map((item) => item.id).indexOf(action.payload.id) : -1;
            let price = state.Carts.listProduct[index].pricePresent ? state.Carts.listProduct[index].pricePresent : state.Carts.listProduct[index].priceOld
            if (index !== -1) {
                state.numberCart -= state.Carts.listProduct[index]?.quantity
                state.Carts.totalPrice -= state.Carts.listProduct[index].quantity * price
                state.Carts.listProduct.splice(index, 1);
            }
            requestAPI(`/cart/delete/products/${action.payload.id}`, 'POST', action.payload.id, { Authorization: `Bearer-${localStorage.getItem('TOKEN')}` })
                .then(res => {
                    if (res) {
                        notificationCustom("Thông Báo", `Xoa Sản Phẩm thành công  `, "success")
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 403) {
                            notificationCustom("Nhắc Nhở", `Vui lòng đăng nhập để thực hiện chức năng này`, "warning")
                        }
                        if (err.response.status === 500) {
                            notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
                        }
                    }
                })
        },
        increarse: (state, action) => {
            var index = state.Carts ? state.Carts.listProduct.map((item) => item.id).indexOf(action.payload.id) : -1;
            if (index !== -1) {
                state.numberCart++
                state.Carts.listProduct[index].quantity++;
                state.Carts.totalPrice += state.Carts.listProduct[index].pricePresent ? state.Carts.listProduct[index].pricePresent : state.Carts.listProduct[index].priceOld
            }
            requestAPI(`/cart/update/${action.payload.id}`, 'PUT', 1, { Authorization: `Bearer-${localStorage.getItem('TOKEN')}` })
                .then(res => {
                    if (res) {
                        console.log({ response: res.data });
                        notificationCustom("Thông Báo", `Cập Nhật Sản Phẩm thành công  `, "success")
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 403) {
                            notificationCustom("Nhắc Nhở", `Vui lòng đăng nhập để thực hiện chức năng này`, "warning")
                        }
                        if (err.response.status === 500) {
                            notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
                        }
                    }
                })
        },
        decrearse: (state, action) => {
            var index = state.Carts ? state.Carts.listProduct.map((item) => item.id).indexOf(action.payload.id) : -1;
            console.log({ index });
            if (index !== -1) {
                if (state.Carts.listProduct[index].quantity > 0) {
                    state.Carts.listProduct[index].quantity--;
                    state.Carts.totalPrice -= state.Carts.listProduct[index].pricePresent ? state.Carts.listProduct[index].pricePresent : state.Carts.listProduct[index].priceOld;
                    state.numberCart--
                    requestAPI(`/cart/update/${action.payload.id}`, 'PUT', -1, { Authorization: `Bearer-${localStorage.getItem('TOKEN')}` })
                        .then(res => {
                            if (res) {
                                console.log({ response: res.data });
                                notificationCustom("Thông Báo", `Cập Nhật Sản Phẩm thành công  `, "success")
                            }
                        })
                        .catch(err => {
                            if (err.response) {
                                if (err.response.status === 403) {
                                    notificationCustom("Nhắc Nhở", `Vui lòng đăng nhập để thực hiện chức năng này`, "warning")
                                }
                                if (err.response.status === 500) {
                                    notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
                                }
                            }
                        })
                } else {
                    state.Carts.listProduct.splice(index, 1);
                    requestAPI(`/cart/delete/products/${action.payload.id}`, 'POST', action.payload.id, { Authorization: `Bearer-${localStorage.getItem('TOKEN')}` })
                        .then(res => {
                            if (res) {
                                console.log({ response: res.data });
                                notificationCustom("Thông Báo", `Xoa Sản Phẩm thành công  `, "success")
                            }
                        })
                        .catch(err => {
                            if (err.response) {
                                if (err.response.status === 403) {
                                    notificationCustom("Nhắc Nhở", `Vui lòng đăng nhập để thực hiện chức năng này`, "warning")
                                }
                                if (err.response.status === 500) {
                                    notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
                                }
                            }
                        })
                }
            }
        },
        cartReceived: (state, action) => {
            if (action.payload.length > 0) {
                action.payload.map(item => { if (item.checkout === false) { return state.Carts = item, state.numberCart = item.quantity } })
            }
        },
        cartCheckout: (state, action) => {
            console.log({ checkoutFunction: action.payload });
            state.Carts = initState
            state.numberCart = 0
        },
        discountReceived: (state, action) => {
            if (action.payload.length > 0) {
                // console.log({ listDiscount: action.payload });   
                state.DiscountMoney = action.payload
            }
        }
    },
});

export const { addToCart, deleteItem, increarse, decrearse, cartReceived, cartCheckout, discountReceived } = CartSlice.actions;
export const selectCart = state => state.product;

export default CartSlice.reducer;
