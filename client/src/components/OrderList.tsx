import { Order } from "../types";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

interface prop_1 {
  orders: Order[];
  setOrder: React.Dispatch<React.SetStateAction<Order | undefined>>;
  setCreateOrderModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmDeleteActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderList = ({
  orders,
  setCreateOrderModalActive,
  setConfirmDeleteActive,
  setOrder,
}: prop_1) => {
  const onUpdateOrder = (order: Order) => {
    setOrder(order);
    setCreateOrderModalActive(true);
  };

  const onDeleteOrder = (order: Order) => {
    console.log("inside delete landfill");
    setOrder(order);
    setConfirmDeleteActive(true);
  };

  const insertOrders = () => {
    return orders.map((order) => (
      <tr key={order.id}>
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          {order.name}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          {order.dumpster_size}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          {order.delivery_date}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          {order.pickup_date}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
          {order.phone_number}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
          <button onClick={() => onUpdateOrder(order)}>
            <PencilIcon className="w-6 h-6 mr-3 black stroke-0  cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:drop-shadow-none active:scale-95" />
          </button>
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
          <button onClick={() => onDeleteOrder(order)}>
            <TrashIcon className="w-6 h-6 mr-3 black stroke-0  cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:drop-shadow-none active:scale-95" />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full mt-2 bg-white border border-gray-200 divide-y divide-gray-100 ">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Dumpster Size
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Delivery Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Pickup Date{" "}
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Phone Number
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>{insertOrders()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
