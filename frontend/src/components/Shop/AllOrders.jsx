import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 250,
      flex: 0.7,
      cellClassName: (params) => {
        let style;
        if(params.row.status === "Delivered")
        {
          style = "text-yellow-700";
        } else if(params.row.status === "Completed"){
          style = "text-green-700";
        }
        else if(params.row.status === "Approval Pending"){
          style = "text-red-700";
        }
        else if(params.row.status === "Approved for Payment"){
          style = "text-green-700";
        }
        return style;
      },
    },
    {
      field: "paymenttype",
      headerName: "Payment Type",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        let style;
        if(params.row.paymenttype === "Complete")
        {
          style = "text-green-700";
        } else if(params.row.paymenttype === "Partial"){
          style = "text-yellow-700";
        }
        else if(params.row.paymenttype === "On Credit"){
          style = "text-red-700";
        }
        return style;
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "Payment",
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const handleApproveOrder = async (e) => {

          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const order = {}
          if(params.row.paymenttype === "On Credit")
          {
            order.status = "Order Placed";
          }else {
            order.status = "Approved for Payment";
          }
          await axios
          .put(
            `${server}/order/update-order-status/${params.id}`,
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
        return(        
          <>
          {params && params.row.status === "Approval Pending" && (
              <Button onClick={handleApproveOrder}>
                Approve order
              </Button>
            )} 
          </>
        );
      }, 
      
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

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
        orderdetails: item,
        paymenttype: item.paymentterms,
      });
    });

  return (
    <>
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
    </>
  );
};

export default AllOrders;
