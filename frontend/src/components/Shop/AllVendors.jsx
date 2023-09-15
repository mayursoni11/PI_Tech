import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import VendorPopupForm from "../Shop/VendorPopupForm";

const AllVendors = () => {

  const [isVendorPopupVisible, setVendorPopupVisible] = useState(false);

  const handleOpenVendorPopup = () => {
    setVendorPopupVisible(true);
  };

  const handleCloseVendorPopup = () => {
    setVendorPopupVisible(false);
  };

  const handleAddVendorSubmit = (formData) => {
    // Handle form submission here, e.g., send data to a server
    console.log('Form Data:', formData);
  };

  return (
      <>
        <div className={`${styles.button}`}>
            <Link onClick={handleOpenVendorPopup}>
              <h1 className="text-[#fff] flex items-center">
                Add Vendor 
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
            {isVendorPopupVisible && (
              <VendorPopupForm onClose={handleCloseVendorPopup} onSubmit={handleAddVendorSubmit} />
            )}
        </div>
      </>
    );
  };

export default AllVendors;