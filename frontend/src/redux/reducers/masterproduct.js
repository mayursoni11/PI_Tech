import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const mproductReducer = createReducer(initialState, {
  mproductCreateRequest: (state) => {
    state.isLoading = true;
  },
  mproductCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  mproductCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all products of shop
  getAllMproductShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllMproductShopSuccess: (state, action) => {
    state.isLoading = false;
    state.mproducts = action.payload;
  },
  getAllMproductShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete product of a shop
  deleteMproductRequest: (state) => {
    state.isLoading = true;
  },
  deleteMproductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteMproductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllMproductRequest: (state) => {
    state.isLoading = true;
  },
  getAllMproductSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllMproductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
});
