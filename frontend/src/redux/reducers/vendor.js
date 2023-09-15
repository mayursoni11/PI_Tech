import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const vendorReducer = createReducer(initialState, {
  vendorCreateRequest: (state) => {
    state.isLoading = true;
  },
  vendorCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.vendor = action.payload;
    state.success = true;
  },
  vendorCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all products of shop
  getAllVendorsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllVendorsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.vendors = action.payload;
  },
  getAllVendorsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete product of a shop
  deleteVendorRequest: (state) => {
    state.isLoading = true;
  },
  deleteVendorSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteVendorFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllVendorsRequest: (state) => {
    state.isLoading = true;
  },
  getAllVendorsSuccess: (state, action) => {
    state.isLoading = false;
    state.allVendors = action.payload;
  },
  getAllVendorsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  
  clearErrors: (state) => {
    state.error = null;
  },
});
