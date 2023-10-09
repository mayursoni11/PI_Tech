import React, { useEffect, useState, Fragment } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import {getAllMasterProductsShop} from '../../redux/actions/masterproduct';
import Select from 'react-select';
import { Dialog, Transition } from '@headlessui/react';

const CreateProduct = ({
  isOpen,
  setIsOpen,
}) => {
  function closeModal() {
    setIsOpen(false);
  }
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const {mproducts, isLoading} = useSelector((state) => state.masterproduct);
  const [itemSelected, setItemSelected] = useState('');

  useEffect(() => {
    dispatch(getAllMasterProductsShop(seller._id));
  }, [dispatch]);

  const allproductlist =[];
  mproducts &&
  mproducts.forEach((item) => {
    allproductlist.push({
      value: item._id,
      label: item.name,
    });
  });

  const handleItemSelected = (itemSelected) => {
    setItemSelected(itemSelected);
  }
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(
      createProduct({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId: seller._id,
        images,
      })
    );
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
              <div className="my-28 p-4 inline-block w-full max-w-md overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl">
                <h5 className="text-[30px] text-center">Create Product</h5>
                {/* create product form */}
                <form>
                  <br />
                  <div className="pb-4">
                    <label className="pb-2">
                      Select Product <span className="text-red-500">*</span>
                    </label>
                    <Select
                      className="mt-2 appearance-none block w-full px-3 h-[35px] rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      options={allproductlist}
                      value={itemSelected}
                      onChange= {handleItemSelected}
                      />
                  </div>
                  <div>
                    <label className="pb-2">
                      Listing Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your product name..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Listing Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      cols="30"
                      required
                      rows="8"
                      type="text"
                      name="description"
                      value={description}
                      className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter your product description..."
                    ></textarea>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Choose a category">Choose a category</option>
                      {categoriesData &&
                        categoriesData.map((i) => (
                          <option value={i.title} key={i.title}>
                            {i.title}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Tags</label>
                    <input
                      type="text"
                      name="tags"
                      value={tags}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Enter your product tags..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Original Price</label>
                    <input
                      type="number"
                      name="price"
                      value={originalPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="Enter your product price..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Price (With Discount) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={discountPrice}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="Enter your product price with discount..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={stock}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Enter your product stock..."
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">
                      Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name=""
                      id="upload"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                      <label htmlFor="upload">
                        <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                      </label>
                      {images &&
                        images.map((i) => (
                          <img
                            src={i}
                            key={i}
                            alt=""
                            className="h-[120px] w-[120px] object-cover m-2"
                          />
                        ))}
                    </div>
                    <br />
                    <div>
                      <input
                        onClick={handleSubmit}
                        type="submit"
                        value="Create"
                        className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </form>
              </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateProduct;
