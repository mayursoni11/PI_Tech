import axios from "axios";
import { server } from "../../server";

// create master product
export const createMasterProduct =
  (
    mproductData,
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "mproductCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/masterproduct/create-master-product`,
        mproductData,
      );
      dispatch({
        type: "mproductCreateSuccess",
        payload: data.masterProduct,
      });
    } catch (error) {
      dispatch({
        type: "mproductCreateFail",
        payload: error.response.data.message,
      });
    }
  };

  //get All master products of a shop
export const getAllMasterProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllMproductShopRequest",
    });

    const { data } = await axios.get(
      `${server}/masterproduct/get-all-mproduct-shop/${id}`
    );
    dispatch({
      type: "getAllMproductShopSuccess",
      payload: data.mproducts,
    });
  } catch (error) {
    dispatch({
      type: "getAllMproductShopFailed",
      payload: error.response.data.message,
    });
  }
};
// get All Products of a shop
// export const getAllProductsShop = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllProductsShopRequest",
//     });

//     const { data } = await axios.get(
//       `${server}/product/get-all-products-shop/${id}`
//     );
//     dispatch({
//       type: "getAllProductsShopSuccess",
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllProductsShopFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

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
