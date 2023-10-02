import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import VendorPopupForm from "../Shop/VendorPopupForm";
import { getAllVendorsShop } from '../../redux/actions/vendor';
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllVendors = () => {

  const [isVendorPopupVisible, setVendorPopupVisible] = useState(false);
  const { vendors, isLoading } = useSelector((state) => state.vendor);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVendorsShop(seller._id));
  }, [dispatch]);

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

  const columns = [
    { field: "id", headerName: "Vendor ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Store Name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "phoneNumber",
      headerName: "Contact Number",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "gstNumber",
      headerName: "GST Number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "email",
      headerName: "Email Id",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  vendors &&
  vendors.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        phoneNumber: item.phoneNumber,
        gstNumber: item.gstNumber,
        email: item.email
      });
    });

  return (
      <>
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
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
          <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
          />
        </div>  
      </>    
    );
  };

export default AllVendors;