import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ProductPopupForm from "../Shop/ProductPopupForm";
import {getAllMasterProductsShop} from '../../redux/actions/masterproduct';
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight } from "react-icons/ai";

const AllMasterProducts = () => {

  const {mproducts, isLoading} = useSelector((state) => state.masterproduct);
  const { seller } = useSelector((state) => state.seller);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMasterProductsShop(seller._id));
  }, [dispatch]);

  const handleOpenProductPopup = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Product Name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "hsn_sac",
      headerName: "HSN/SAC",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "gstrate",
      headerName: "GST Rate",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "stock",
      headerName: "Stock",
      minWidth: 130,
      flex: 0.8,
    },

    // {
    //   field: " ",
    //   flex: 1,
    //   minWidth: 150,
    //   headerName: "",
    //   type: "number",
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={`/order/${params.id}`}>
    //           <Button>
    //             <AiOutlineArrowRight size={20} />
    //           </Button>
    //         </Link>
    //       </>
    //     );
    //   },
    // },
  ];

  const row = [];

  mproducts &&
  mproducts.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        hsn_sac: item.hsn_sac,
        gstrate: item.gstrate + "%",
        stock: item.stock
      });
    });

  return (
      <>
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <Link onClick={handleOpenProductPopup}>
          <div className={`${styles.button} ml-2`}>
                <h1 className="text-[#fff] flex items-center">
                  Add Product 
                  <IoIosArrowForward className="ml-1" />
                </h1>
                <ProductPopupForm isOpen={isOpen} setIsOpen={setIsOpen}/>          
          </div>
          </Link>
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

export default AllMasterProducts;