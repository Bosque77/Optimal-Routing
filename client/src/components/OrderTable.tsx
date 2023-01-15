import React, { useState } from "react";
import { Order } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useEffect } from "react";
import CreateOrderForm from "./CreateOrderForm";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { TruckIcon } from "@heroicons/react/24/solid";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import M from "materialize-css";

// import EditOrderForm from "./EditOrderForm";
// import ConfirmDelete from "./ConfirmDelete";

interface prop_1 {
  orders: Order[];
}

const OrderList = ({ orders }: prop_1) => {
  // const orders = useSelector((state: State) => state.orders);
  const [order, setOrder] = useState<Order>(orders[0]);
  const [editFormActive, setEditFormActive] = useState(false);
  const [createFormActive, setCreateFormActive] = useState(false);
  const [orderInfoFormActive, setOrderInfoFormActive] = useState(false);
  const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);

  const editOrder = (order: Order) => {
    setOrder(order);
    setEditFormActive(true);
  };

  const info = (order: Order) => {
    setOrder(order);
    setOrderInfoFormActive(true);
  };

  const onDeleteOrder = (order: Order) => {
    console.log("inside delete landfill");
    setOrder(order);
    setConfirmDeleteActive(true);
  };

  const onCreateOrder = () => {
    setCreateFormActive(true);
  };

  const insertOrders = () => {
    return orders.map((order) => (
      <tr key={order.id}>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {order.name}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {order.dumpster_size}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {order.delivery_date}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {order.pickup_date}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {order.phone_number}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
          <PencilIcon className="w-6 h-6 mr-3 black stroke-1 hover:text-indigo-900 cursor-pointer active:drop-shadow-none active:scale-95" />
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
          <TrashIcon className="w-6 h-6 mr-3 black stroke-1 hover:text-red-900 cursor-pointer active:drop-shadow-none active:scale-95" />
        </td>
        {/*         
                    <td> <button className="btn-floating btn waves-light red" onClick={() => editOrder(order)}><i className="material-icons">mode_edit</i></button></td>
                    <td> <button className="btn-floating btn black" onClick={() => onDeleteOrder(order)}><i className="material-icons">delete</i></button></td>
                    <td> <button className="btn-floating btn green" onClick={() => info(order)}><i className="material-icons">info_outline</i></button></td> */}
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full">
            <thead className="border-b bg-slate-200">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  Customer Name
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  Dumpster Size
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  Delivery Date
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  Pickup Date{" "}
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                >
                  Phone Number
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>{insertOrders()}</tbody>
          </table>
          {/* {editFormActive && <EditOrderForm order={order} setActive={setEditFormActive}  />}
            {createFormActive && <CreateOrderForm setActive={setCreateFormActive} />}
            {orderInfoFormActive && <OrderInfoForm setActive={setOrderInfoFormActive} order={order}/>}
            {confirmDeleteActive && <ConfirmDelete setActive={setConfirmDeleteActive} order={order} />} */}
        </div>
      </div>
    </div>
  );
};

interface prop_2 {
  setCreateOrderModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderTable = ({ setCreateOrderModalActive }: prop_2) => {
  const dispatch = useDispatch();
  const region = useSelector((state: State) => state.setRegion);
  const orders = useSelector((state: State) => state.orders);
  const { initializeOrders } = bindActionCreators(actionCreators, dispatch);

  
  const [selectedDate, handleDateChange] = useState(new Date());
  const [createOrder, setCreateOrder] = useState(false);
  const [showInfo, setShowInfo] = useState(false);



  useEffect(() => {
    if (region) {
      initializeOrders(region, selectedDate.toDateString());
    }
  }, [region, selectedDate]);

  return (
    <div className="bg-white drop-shadow-md rounded">
      <div className="bg-lime-500 pt-2"></div>
      <div className="relative">
        <div className="flex flex-row mt-4 ml-4">
          <InformationCircleIcon
            className="w-6 h-6 mr-3 text-lime-500 hover:text-indigo-800 cursor-pointer"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          />
          <h2 className="text-left font-sans text-black text-xl">Orders</h2>
          {showInfo && (
            <div className="bg-slate-700 text-white rounded-md p-2 absolute top-full left-0 mt-4 ml-4">
              Delivery and Pickup orders for the day
            </div>
          )}
        </div>
      </div>

      <div className="text-right my-5 mr-5 flex justify-end ">
        <div className="col l3 mr-3">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => handleDateChange(date)}
            className="border-2 rounded w-48 p-2"
          />
        </div>
        <div className="col l3">
          <button
            className="bg-slate-700 text-white px-7 py-1 rounded-full drop-shadow-md hover:bg-stone-900 hover:text-slate-100 hover:drop-shadow-md active:drop-shadow-none active:scale-95 modal-trigger"
            data-target="modal1"
            onClick={() => setCreateOrderModalActive(true)}
          >
            Add Order
          </button>
        </div>
      </div>
      <div className="drop-shadow-sm px-4">
        <div className="">
          {orders.length === 0 && (
            <div className="m-4">
              <div>There are no orders for today. </div>
              <div>
                Add a order for today or change the date to see the orders for
                that day.
              </div>
              <TruckIcon className="w-20 h-20 my-4 mb-10 black mx-auto text-lime-500" />
            </div>
          )}
          {orders.length > 0 && <OrderList orders={orders} />}
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
