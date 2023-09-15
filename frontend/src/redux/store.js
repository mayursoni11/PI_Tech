import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { vendorReducer } from "./reducers/vendor";
import { mproductReducer } from "./reducers/masterproduct";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";


const Store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer,
    products: productReducer,
    vendor: vendorReducer,
    masterproduct: mproductReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export default Store;
