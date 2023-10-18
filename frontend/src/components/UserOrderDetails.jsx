import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "./Layout/Loader";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch,user._id]);

  const data = orders && orders.find((item) => item._id === id);


  const columns = [
    { field: "id", headerName: "No", minWidth: 150, flex: 0.7
    },

    {
      field: "productname",
      headerName: "Product Name",
      minWidth: 250,
      flex: 0.7,
    },
    {
      field: "rate",
      headerName: "Rate",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "itemsQty",
      headerName: "Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "totalrate",
      headerName: "Total Rate",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];

  data &&
  data?.cart.forEach((item) => {
    row.push({
      id: item._id,
      productname: item.name,
      rate: item.discountPrice,
      itemsQty: item.qty,
      totalrate: item.discountPrice * item.qty,
    });
  });

  var paidamt = 0;
  data &&
  data?.paymentInfo.forEach((item) => {
    paidamt += item.paidamount; 
  });

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          CGST: <strong>{data?.totalGst%2}</strong>
        </h5>
        <h5 className="pt-3 text-[18px]">
          SGST: <strong>{data?.totalGst%2}</strong>
        </h5>
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>{data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4>{data?.shippingAddress.country}</h4>
          <h4>{data?.shippingAddress.city}</h4>
          <h4>{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-[600]">Payment Type:</h4>
          <h4 className="text-[20px]">
            {data?.paymentterms ? data?.paymentterms : "Not Paid"}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-[600]">Paid Amount:</h4>
          <h4 className="text-[20px]">
            {paidamt ? paidamt : 0}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-[600]">Pending Amount:</h4>
          <h4 className="text-[20px]">
            {data?.totalPrice - paidamt}<br/>
          </h4>
        </div>
        {data?.requestedAmt > 0 && data?.paymentterms === "Partial" &&
        (<div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px] font-[600]">Initial Partial Amount:</h4>
          <h4 className="text-[20px]">
            {data?.requestedAmt}<br/>
          </h4>
        </div>
        )}
      </div>
      <br />
      <br />
      
  
        <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
        <h3 >{data?.status}</h3>
      {/* {
        data?.status === "Processing refund" || data?.status === "Refund Success" ? (
          <select value={status} 
       onChange={(e) => setStatus(e.target.value)}
       className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
      >
        {[
            "Processing refund",
            "Refund Success",
          ]
            .slice(
              [
                "Processing refund",
                "Refund Success",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
      </select>
        ) : null
      } */}
    </div>
  );
};

export default UserOrderDetails;
