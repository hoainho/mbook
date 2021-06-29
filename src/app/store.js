import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../features/account/accountSlice';
import CartSlice from '../features/cart/CartSlice';
import OrderSlice from '../features/order/OrderSlice';
import productReducer from '../features/product/productSlice';
import PosterSlice from '../features/poster/posterSlice';
export default configureStore({
  reducer: {
    account: accountReducer,
    product: productReducer,
    cart: CartSlice,
    order: OrderSlice,
    poster: PosterSlice
  },
});
