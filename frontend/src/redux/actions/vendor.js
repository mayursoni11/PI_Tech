import axios from "axios";
import { server } from "../../server";

// create vendor
export const createVendor = (vendorData,) => async (dispatch) => {
    try {
      dispatch({
        type: "vendorCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/vendor/create-vendor`,
        vendorData,
      );
      dispatch({
        type: "vendorCreateSuccess",
        payload: data.vendor,
      });
    } catch (error) {
      dispatch({
        type: "vendorCreateFail",
        payload: error.response.data.message,
      });
    }
  };

//get All Vendors of a shop
export const getAllVendorsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllVendorsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/vendor/get-all-vendors-shop/${id}`
    );
    dispatch({
      type: "getAllVendorsShopSuccess",
      payload: data.vendors,
    });
  } catch (error) {
    dispatch({
      type: "getAllVendorsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// // delete product of a shop
// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteProductRequest",
//     });

//     const { data } = await axios.delete(
//       `${server}/product/delete-shop-product/${id}`,
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch({
//       type: "deleteProductSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteProductFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// // get all products
// export const getAllProducts = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllProductsRequest",
//     });

//     const { data } = await axios.get(`${server}/product/get-all-products`);
//     dispatch({
//       type: "getAllProductsSuccess",
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllProductsFailed",
//       payload: error.response.data.message,
//     });
//   }
// };
