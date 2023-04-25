import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useEffect } from "react";
import CreateOrderForm from "./CreateOrderForm";
import OrderList from "./OrderList";
import { InformationCircleIcon } from "@heroicons/react/24/outline";


import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Order } from "../types";
import ConfirmDelete from "./ConfirmDelete";



// import EditOrderForm from "./EditOrderForm";
// import ConfirmDelete from "./ConfirmDelete";



interface prop_2 {
  setCreateOrderModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderTable = () => {
  const dispatch = useDispatch();
  const region = useSelector((state: State) => state.setRegion);
  const orders = useSelector((state: State) => state.orders);
  const { initializeOrders } = bindActionCreators(actionCreators, dispatch);

  const [selectedDate, handleDateChange] = useState(new Date());
  const [createOrder, setCreateOrder] = useState(false);
  const [order, setOrder] = useState<Order|undefined>(undefined);
  const [showInfo, setShowInfo] = useState(false);
  const [createOrderModalActive, setCreateOrderModalActive] = useState(false);
  const [confirmDeleteActive, setConfirmDeleteActive] = useState<boolean>(false);

  const onCreateOrder = () => {
    setOrder(undefined)
    setCreateOrderModalActive(true);
  };


  useEffect(() => {
    if (region) {
      initializeOrders(region, selectedDate.toDateString());
    }
  }, [region, selectedDate]);



  return (
    <div className="z-10">
      <div className="bg-white drop-shadow-md rounded z-10 pb-4">
        <div className="bg-stone-500 pt-2"></div>
        <div className="relative">
          <div className="flex flex-row mt-4 ml-4">
            <InformationCircleIcon
              className="w-6 h-6 mr-3 text-slate-700 hover:text-indigo-800 cursor-pointer"
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

        <div className="text-right my-5 mr-5 flex justify-end">
          <div className="col l3 mr-3">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => handleDateChange(date)}
              className="border-2 rounded w-48 p-2"
            />
          </div>
          <div className="col l3">
            <button
              className="bg-slate-700 text-white px-7 py-1 rounded-full drop-shadow-md hover:bg-stone-900 hover:text-white hover:drop-shadow-md active:drop-shadow-none active:scale-95 modal-trigger"
              data-target="modal1"
              onClick={() => onCreateOrder()}
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
                <ClipboardDocumentIcon className="w-20 h-20 my-4 mb-10 black mx-auto text-stone-300" />
              </div>
            )}
            {orders.length > 0 && <OrderList orders={orders} setOrder={setOrder} setConfirmDeleteActive={setConfirmDeleteActive} setCreateOrderModalActive={setCreateOrderModalActive}/>}
          </div>
        </div>
      </div>
      {createOrderModalActive && (
        <CreateOrderForm setActive={setCreateOrderModalActive} order={order} />
      )}
      {confirmDeleteActive && ( <ConfirmDelete setActive={setConfirmDeleteActive} order={order}/> )}
    </div>
  );
};

export default OrderTable;
