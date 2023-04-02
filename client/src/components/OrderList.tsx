import { Order } from "../types";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";


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
            <PencilIcon className="w-6 h-6 mr-3 black stroke-0  cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:drop-shadow-none active:scale-95" />
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
            <TrashIcon className="w-6 h-6 mr-3 black stroke-0  cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:drop-shadow-none active:scale-95" />
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
          </div>
        </div>
      </div>
    );
  };

  export default OrderList;