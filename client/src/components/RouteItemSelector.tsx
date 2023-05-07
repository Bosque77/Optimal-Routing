import { useSelector } from "react-redux";
import { State } from "../state";
import { useContext, useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { SelectedRouteItemsContext, SelectedRouteItemsContextType } from "./SelectedRouteItemsContext";

interface prop {
  setShowRouteItemSelector: React.Dispatch<React.SetStateAction<boolean>>;
  ordersInRoutes: Set<string>;
}

const RouteItemSelector = ({ setShowRouteItemSelector, ordersInRoutes  }: prop) => {
  const orders = useSelector((state: State) => state.orders);
  const depots = useSelector((state: State) => state.depots);
  const landfills = useSelector((state: State) => state.landfills);

  const {  selectedDate } =
  useContext<SelectedRouteItemsContextType>(SelectedRouteItemsContext);

  const [routeItemType, setRouteItemType] = useState("Orders");

  const filteredOrders = orders.filter((order) => !ordersInRoutes.has(order.id));

    const insertOrders = () => {
      return filteredOrders.map((order) => {
        return (
          <tr key={order.id} className="bg-white divide-y divide-gray-100">
            <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center ">
              {order.name}
            </td>
            <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center">
              {order.street} {order.city}, {order.state} {order.zipcode}
            </td>
            <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center">
              {order.dumpster_size}
            </td>
            {selectedDate.toDateString() === order.pickup_date && (
              <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center">
                Pickup
              </td>
            )}
            {selectedDate.toDateString() === order.delivery_date && (
              <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center">
                Delivery
              </td>
            )}
          </tr>
        );
      });
    };

  //   const insertLandfills = () => {
  //     return landfills.map((landfill) => {
  //       const isChecked = selectedLandfills.has(landfill.id);
  //       return (
  //         <tr key={landfill.id} className="bg-white divide-y divide-gray-100">
  //           <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
  //             {landfill.name}
  //           </td>
  //           <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
  //             {landfill.street} {landfill.city}, {landfill.state}{" "}
  //             {landfill.zipcode}
  //           </td>
  //           <td>
  //             <input
  //               type="checkbox"
  //               className="form-checkbox h-5 w-5 text-blue-600 rounded w-16"
  //               checked={isChecked}
  //               onChange={(e) =>
  //                 handleLandfillSelection(landfill.id, e.target.checked)
  //               }
  //             />
  //           </td>
  //         </tr>
  //       );
  //     });
  //   };

  //   const insertDepots = () => {
  //     return depots.map((depot) => {
  //       const isChecked = selectedDepots.has(depot.id);
  //       return (
  //         <tr key={depot.id} className="bg-white divide-y divide-gray-100">
  //           <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
  //             {depot.name}
  //           </td>
  //           <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
  //             {depot.street} {depot.city}, {depot.state} {depot.zipcode}
  //           </td>
  //           <td>
  //             <input
  //               type="checkbox"
  //               className="form-checkbox h-5 w-5 text-blue-600 rounded w-16"
  //               checked={isChecked}
  //               onChange={(e) => handleDepotSelection(depot.id, e.target.checked)}
  //             />
  //           </td>
  //         </tr>
  //       );
  //     });
  //   };

  return (
    <div>
      <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white z-20 p-4">
          <div className="grid grid-cols-3 gap-x-2">
            <button
              className={`w-64 mt-4 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md focus:outline-none ${
                routeItemType === "Orders"
                  ? "bg-gray-200"
                  : "bg-white hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setRouteItemType("Orders")}
            >
              Orders
            </button>
            <button
              className={`w-64 mt-4 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md focus:outline-none ${
                routeItemType === "Landfills"
                  ? "bg-gray-200"
                  : "bg-white hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setRouteItemType("Landfills")}
            >
              Landfills
            </button>
            <button
              className={`w-64 mt-4 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md focus:outline-none ${
                routeItemType === "Depots"
                  ? "bg-gray-200"
                  : "bg-white hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setRouteItemType("Depots")}
            >
              Depots
            </button>
          </div>
          {routeItemType === "Orders" && filteredOrders.length > 0 && (
            <div className="px-6 py-6  z-20  bg-white  rounded flex flex-col">
              <table className="table-automt-2  bg-white border border-gray-200 divide-y divide-gray-100 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Address
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Dumpster Size
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {insertOrders()}
                </tbody>
              </table>
            </div>
          )} {

          }
          {routeItemType === "Orders" && filteredOrders.length === 0 &&(

 
              <div className="flex flex-col items-center mt-6">
                <div className="w-96">All orders are currently assigned. To prevent duplication of orders you must delete
                    an order from a route item in order to insert it into a new location. </div>
                <ClipboardDocumentIcon className="w-20 h-20 my-4 mb-10 black mx-auto text-stone-300 text-green-200" />
              </div>
            )}
          <div className="flex justify-end">
            <button
              className="mt-6 px-4 py-2 bg-white border hover:bg-black hover:text-white active:scale-95 rounded"
              onClick={() => setShowRouteItemSelector(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteItemSelector;
