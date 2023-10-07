import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMasterProduct } from "../../redux/actions/masterproduct";
import { toast } from "react-toastify";

const ProductPopupForm = ({ onClose }) => {

  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [hsn_sac, setHsnsac] = useState("");
  const [gstrate, setGstrate] = useState("");
  const [gst_product, setGstProduct] = useState("");
  const handleGstChange = (e) => {
    setGstProduct(e.target.value);
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newForm = new FormData();

    newForm.append("name", name);
    newForm.append("hsn_sac", hsn_sac);
    newForm.append("gstrate", gstrate);
    newForm.append("gst_product", gst_product);
    newForm.append("shopId", seller._id);
    dispatch(
        createMasterProduct({
        name,
        hsn_sac,
        gstrate,
        gst_product,
        shopId: seller._id,
      })
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-1/2 h-1/2 overflow-y-auto">
        <span className="absolute top-2 right-2 text-gray-600 cursor-pointer" onClick={onClose}>
          close
        </span>
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="pb-2">
                Product Name <span className="text-red-500">*</span>
            </label>
            <input
                type="text"
                name="name"
                value={name}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2">Enable GST</label>
            <input
                type="radio"
                name="gst_product"
                value="1"
                checked={gst_product === 1}
                onChange={handleGstChange}
            />
            <input
                type="radio"
                name="gst_product"
                value="0"
                checked={gst_product === 0}
                onChange={handleGstChange}
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2">HSN/SAC Code</label>
            <input
                type="number"
                name="hsn_sac"
                className={`${styles.input}`}
                value={hsn_sac}
                onChange={(e) => setHsnsac(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2">GST Rate</label>
            <input
                type="number"
                name="gstrate"
                className={`${styles.input}`}
                value={gstrate}
                onChange={(e) => setGstrate(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProductPopupForm;
