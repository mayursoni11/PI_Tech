import React, { useEffect, useState, Fragment } from "react";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMasterProduct } from "../../redux/actions/masterproduct";
import { toast } from "react-toastify";
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";

const ProductPopupForm = ({
  isOpen,
  setIsOpen, }) => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen(false);
  }

  const [name, setName] = useState("");
  const [hsn_sac, setHsnsac] = useState("");
  const [gstrate, setGstrate] = useState("");
  const [gst_product, setGstProduct] = useState("");
  const [isR1Checked, setIsR1Checked] = useState(false);
  const [isR2Checked, setIsR2Checked] = useState(false);

  const handleGstChange = (e) => {
    setGstProduct(e.target.value);
    if(e.target.value == 1)
    {
      setIsR1Checked(true);
      setIsR2Checked(false);
    } else {
      setIsR2Checked(true);
      setIsR1Checked(false);
    }
    
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
    window.location.reload();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div id="outer-modal" className="min-h-screen px-4 flex justify-center items-center">
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 p-4 inline-block w-full max-w-md overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl">
                <div className="flex justify-between">
                <h2 className="text-xl font-semibold mb-4">Add Product</h2>
                {/* <Link onClick={closeModal}><FaTimes className="ml-auto"/></Link> */}
                </div>
                <form>
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
                  <div className="mb-4 items-center">
                    <label className="block pb-2">Enable GST</label>
                    <input
                        className="h-3 w-3 text-blue-600 focus:ring-blue-300"
                        type="radio"
                        name="gst_product"
                        value="1"
                        checked={isR1Checked}
                        onChange={handleGstChange}
                    />
                    <label for="radio1" class="ml-2 mr-4 text-gray-700">YES</label>
                    <input
                        className="h-3 w-3 text-blue-600 focus:ring-blue-300"
                        type="radio"
                        name="gst_product"
                        value="0"
                        checked={isR2Checked}
                        onChange={handleGstChange}
                    />
                    <label for="radio1" class="ml-2 text-gray-700">NO</label>
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
                  <button onClick={handleSubmit} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Submit</button>
                </form>
            </div>
          </Transition.Child>  
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductPopupForm;
