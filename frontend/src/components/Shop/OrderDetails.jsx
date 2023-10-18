import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    const order = {};
    order.status = status;
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          order,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleApproveOrder = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const order = {}
    if(data?.paymentterms === "On Credit")
    {
      order.status = "Order Placed";
    }else {
      order.status = "Approved for Payment";
    }
    await axios
    .put(
      `${server}/order/update-order-status/${data?._id}`,
      {
        order,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Order updated!");
      navigate("/dashboard-orders");
      window.location.reload();
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
    .put(
      `${server}/order/order-refund-success/${id}`,
      {
        status,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Order updated!");
      dispatch(getAllOrdersOfShop(seller._id));
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  const handleReqPendingPayment = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const order = {}
    order.status = "Pending Payment Requested";
    order.requestedAmt = data?.totalPrice - paidamt;
    await axios
    .put(
      `${server}/order/update-order-status/${data?._id}`,
      {
        order,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Order updated!");
      navigate("/dashboard-orders");
      window.location.reload();
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  console.log(data?.status);

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

    //setPendingAmt(data?.totalPrice - paidAmt);


  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
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
            <h6 className="text-[16px] text-[red]">{(data?.totalPrice - paidamt) > 0 && data?.status !== "Approval Pending" && data?.status !== "Approved for Payment" && (<Link onClick={handleReqPendingPayment}><u>Request Pending Payment</u></Link>)}</h6>
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
      
      {data?.status !== "Processing refund" && data?.status !== "Refund Success" && data?.status !== "Approval Pending" && data?.status !== "Approved for Payment" && data?.status !== "Pending Payment Requested" && (
        <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>,
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {[
            "Approval Pending",
            "Approved for Payment",
            "Order Placed",
            "Out for Delivery",
            "Delivered",
            "Completed",
          ]
            .slice(
              [
                "Approval Pending",
                "Approved for Payment",
                "Order Placed",
                "Out for Delivery",
                "Delivered",
                "Completed",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      )}
      {
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
      }

      {data?.status !== "Approval Pending" && data?.status !== "Approved for Payment" && data?.status !== "Pending Payment Requested" && (
        <div
          className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
          onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
        >
          Update Status
        </div>
      )}

      {data?.status === "Approval Pending" && (
        <div
          className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[16px]`}
          onClick={handleApproveOrder}
        >
          APPROVE ORDER
        </div>
      )}
      
    </div>
  );
};

export default OrderDetails;
