import React, {useEffect, useState} from 'react';
import InvoiceField from './InvoiceField';
import Select from 'react-select';
import {getAllMasterProductsShop} from '../../redux/actions/masterproduct';
import { useSelector, useDispatch } from 'react-redux';

const InvoiceItem = ({ id, name, qty, price, onDeleteItem, onEdtiItem }) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };
  const allproductlist = []

  const {mproducts, isLoading} = useSelector((state) => state.masterproduct);
  const { seller } = useSelector((state) => state.seller);
  const [itemSelected, setItemSelected] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMasterProductsShop(seller._id));
  }, [dispatch]);


  const handleItemSelected = (itemSelected) => {
    setItemSelected(itemSelected);
    const elementWithClass = document.querySelector('.itemname');
    const event = new KeyboardEvent('keypress', {
      key: ' ', // Specify the desired key
      keyCode: 32, // Specify the desired key code (Enter key code)
    });
    elementWithClass.dispatchEvent(event);
  }

  mproducts &&
  mproducts.forEach((item) => {
    allproductlist.push({
      value: item._id,
      label: item.name,
    });
  });

  return (
    <tr className="pt-[20px] pb-[20px]">
      <td className="w-full">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            placeholder: 'Item name',
            type: 'option',
            name: 'name',
            id: id,
            value: itemSelected.label,
            className: 'itemname',
          }}
        />
        <Select
            id = {id}
            name = 'name'
            className="flex-1 w-[400px] min-w-[65px] md:min-w-[80px]"
            options={allproductlist}
            value={itemSelected}
            onChange= {handleItemSelected}
            />
      </td>
      <td className="min-w-[65px] md:min-w-[80px]">
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: 'number',
            min: '1',
            name: 'qty',
            id: id,
            value: qty,
          }}
        />
      </td>
      <td className="relative min-w-[100px] md:min-w-[150px]">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M7.828 9.172l-2.828 2.828a2 2 0 0 0 0 2.828s2 2 2.828 2.828c.83.83 2.172.83 3.001 0 .83-.83.83-2.172 0-3.001a2 2 0 0 0-2.828 0l-2.828 2.828M8 13h8"
          />
          <circle cx="12" cy="12" r="2" />
        </svg> */}
        <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            className: 'text-center',
            type: 'number',
            min: '0.01',
            step: '0.01',
            name: 'price',
            id: id,
            value: price,
          }}
        />
      </td>
      <td className="flex items-center justify-center">
        <button
          className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
          onClick={deleteItemHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;