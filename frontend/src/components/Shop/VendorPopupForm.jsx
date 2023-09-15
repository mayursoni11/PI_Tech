import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createVendor } from "../../redux/actions/vendor";
import { toast } from "react-toastify";

const VendorPopupForm = ({ onClose }) => {

  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
//   const [address1, setAddress1] = useState("");
//   const [country, setCountry] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [zipCode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gst_vendor, setGstVendor] = useState("");
  const handleGstChange = (e) => {
    setGstVendor(e.target.value);
  };
  const [gstNumber, setGstNumber] = useState("");

  const [address, setAddress] = useState({
    country: '',
    state: '',
    city: '',
    address1: '',
    zipCode: '',
  });
  const handleVendorAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Vendor created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newForm = new FormData();

    newForm.append("name", name);
    newForm.append("address", address);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("gst_vendor", gst_vendor);
    newForm.append("gstNumber", gstNumber);
    newForm.append("email", email);
    newForm.append("shopId", seller._id);
    dispatch(
        createVendor({
        name,
        address,
        phoneNumber,
        gst_vendor,
        gstNumber,
        email,
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
        <h2 className="text-xl font-semibold mb-4">Add Vendor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="pb-2">
                Company Name <span className="text-red-500">*</span>
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
            <label className="block pb-2">Shop no/Lane</label>
            <input
                type="text"
                name="address1"
                className={`${styles.input}`}
                required
                value={address.address1}
                onChange={handleVendorAddress}
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2">Country</label>
            <input
                type="text"
                name="country"
                className={`${styles.input}`}
                required
                value={address.country}
                onChange={handleVendorAddress}
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2">State</label>
            <input
                type="text"
                name="state"
                className={`${styles.input}`}
                required
                value={address.state}
                onChange={handleVendorAddress}
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2">City</label>
            <input
                type="text"
                name="city"
                className={`${styles.input}`}
                required
                value={address.city}
                onChange={handleVendorAddress}
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2">Pin Code</label>
            <input
                type="number"
                name="zipCode"
                className={`${styles.input}`}
                required
                value={address.zipCode}
                onChange={handleVendorAddress}
            />
          </div>
          <div className="mb-4">
                <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
                >
                Email address
              </label>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
          </div>
          <div className="mb-4">
            <label className="block pb-2">Contact no</label>
            <input
                type="number"
                name="phoneNumber"
                className={`${styles.input}`}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2">Enable GST</label>
            <input
                type="radio"
                name="gst_vendor"
                value="1"
                checked={gst_vendor === 1}
                onChange={handleGstChange}
            />
            <input
                type="radio"
                name="gst_vendor"
                value="0"
                checked={gst_vendor === 0}
                onChange={handleGstChange}
            />
          </div>
          <div className="mb-4">
            <label className="block pb-2">GSTIN/UIN</label>
            <input
                type="text"
                name="gstNumber"
                className={`${styles.input}`}
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default VendorPopupForm;
