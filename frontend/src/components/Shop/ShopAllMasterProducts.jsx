import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ProductPopupForm from "../Shop/ProductPopupForm";

const AllMasterProducts = () => {

  const [isProductPopupVisible, setProductPopupVisible] = useState(false);

  const handleOpenProductPopup = () => {
    setProductPopupVisible(true);
  };

  const handleCloseProductPopup = () => {
    setProductPopupVisible(false);
  };

  const handleAddProductSubmit = (formData) => {
    // Handle form submission here, e.g., send data to a server
    console.log('Form Data:', formData);
  };

  return (
      <>
        <div className={`${styles.button}`}>
            <Link onClick={handleOpenProductPopup}>
              <h1 className="text-[#fff] flex items-center">
                Add Product 
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
            {isProductPopupVisible && (
              <ProductPopupForm onClose={handleCloseProductPopup} onSubmit={handleAddProductSubmit} />
            )}
        </div>
      </>
    );
  };

export default AllMasterProducts;