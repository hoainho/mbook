import { useEffect, useState } from 'react';
import { createSlice } from '@reduxjs/toolkit';
import requestAPI from '../../api/index';
import notificationCustom from '../../notification/index';

const initState = {
    detailCarts: [],
    totalPrice: 0,
    idCart: ''
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
            if (state.Carts?.detailCarts?.length > 0) {
                let check = false;
                state.Carts.detailCarts.map((item, key) => {
                    if (item.idProduct == action.payload.idProduct) {
                        if (state.Carts.detailCarts[key].quantity < 1) {
                            state.Carts.detailCarts.splice(key, 1);
                        } else {
                            state.Carts.detailCarts[key].quantity += action.payload.quantity;
                            state.Carts.totalPrice += (action.payload.priceSale
                                ? action.payload.priceSale : action.payload.priceOld) * action.payload.quantity
                        }

                        check = true
                    }
                })
                if (!check) {
                    let item = {
                        idProduct: action.payload.idProduct,
                        idProductNavigation: action.payload,
                        quantity: action.payload.quantity,
                        total: (action.payload.priceSale ? action.payload.priceSale : action.payload.priceOld) * action.payload.quantity
                    }
                    state.Carts.totalPrice = state.Carts.totalPrice + (action.payload.priceSale ? action.payload.priceSale : action.payload.priceOld) * action.payload.quantity
                    state.Carts?.detailCarts.push(item)

                }
            } else { // Cart Empty
                let item = {
                    idProduct: action.payload.idProduct,
                    idProductNavigation: action.payload,
                    quantity: action.payload.quantity,
                    total: (action.payload.priceSale ? action.payload.priceSale : action.payload.priceOld) * action.payload.quantity
                }
                state.Carts?.detailCarts?.push(item)
                state.Carts.totalPrice += (action.payload.priceSale ? action.payload.priceSale : action.payload.priceOld) * action.payload.quantity
            }
            let temp = [{ idProduct: action.payload.idProduct }]
            const dataFormat = { detailCarts: temp, quantity: action.payload.quantity, totalPrice: (action.payload.priceSale ? action.payload.priceSale : action.payload.priceOld) * action.payload.quantity }
            console.log({ dataFormat });
            requestAPI(`/cart`, 'POST', dataFormat, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
                .then(res => {
                    if (res) {
                        notificationCustom("Thông Báo", `${res.data}`, "success")
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 401) {
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
            console.log({ deleteItem: action.payload });
            var index = state.Carts.detailCarts ? state.Carts.detailCarts.map((item) => item.id).indexOf(action.payload.id) : -1;
            let price = state.Carts.detailCarts[index].priceSale ? state.Carts.detailCarts[index].priceSale : state.Carts.detailCarts[index].priceOld
            if (index !== -1) {
                state.numberCart -= action.payload.quantity
                state.Carts.totalPrice -= action.payload.total
                state.Carts.detailCarts.splice(index, 1);
            }
            requestAPI(`/cart/removeItem/${action.payload.id}`, 'DELETE', null, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
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
            var index = state.Carts ? state.Carts.detailCarts.map((item) => item.id).indexOf(action.payload.id) : -1;
            if (index !== -1) {
                state.numberCart++
                state.Carts.detailCarts[index].quantity++;
                state.Carts.totalPrice += state.Carts.detailCarts[index].priceSale ? state.Carts.detailCarts[index].priceSale : state.Carts.detailCarts[index].priceOld
            }
            requestAPI(`/cart`, 'POST',
                { quantity: 1, DetailCarts: [{ idProduct: action.payload.id }], price: action.payload.price, totalPrice: action.payload.totalPrice }
                , { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
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
            var index = state.Carts ? state.Carts.detailCarts.map((item) => item.id).indexOf(action.payload.id) : -1;
            console.log({ index });
            if (index !== -1) {
                if (state.Carts.detailCarts[index].quantity > 0) {
                    state.Carts.detailCarts[index].quantity--;
                    state.Carts.totalPrice -= state.Carts.detailCarts[index].priceSale ? state.Carts.detailCarts[index].priceSale : state.Carts.detailCarts[index].priceOld;
                    state.numberCart--
                    requestAPI(`/cart/${action.payload.id}`
                        , 'POST', { quantity: 1, DetailCarts: [{ idProduct: action.payload.id }], price: action.payload.price, totalPrice: action.payload.totalPrice }
                        , { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
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
                    state.Carts.detailCarts.splice(index, 1);
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
            console.log({ cartload: action.payload });
            if (action.payload != null) {
                state.Carts.detailCarts = action.payload.detailCarts
                state.Carts.totalPrice = action.payload.totalPrice
                state.Carts.idCart = action.payload.idCart
                state.numberCart = action.payload.quantity
            }
        },
        cartCheckout: (state, action) => {
            state.Carts = initState
            state.numberCart = 0
        },
        discountReceived: (state, action) => {
            if (action.payload.length > 0) {
                state.DiscountMoney = action.payload
            }
        }
    },
});

export const { addToCart, deleteItem, increarse, decrearse, cartReceived, cartCheckout, discountReceived } = CartSlice.actions;
export const selectCart = state => state.product;

export default CartSlice.reducer;
