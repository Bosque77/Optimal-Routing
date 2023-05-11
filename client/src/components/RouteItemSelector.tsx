import { useSelector } from "react-redux";
import { State } from "../state";
import { useContext, useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

import {
  SelectedRouteItemsContext,
  SelectedRouteItemsContextType,
} from "./SelectedRouteItemsContext";
import { RouteObject } from "../../../shared/types";

interface prop {
  setShowRouteItemSelector: React.Dispatch<React.SetStateAction<boolean>>;
  ordersInRoutes: Set<string>;
}

const RouteItemSelector = ({
  setShowRouteItemSelector,
  ordersInRoutes,
}: prop) => {
  const orders = useSelector((state: State) => state.orders);
  const depots = useSelector((state: State) => state.depots);
  const landfills = useSelector((state: State) => state.landfills);

  const { selectedDate } = useContext<SelectedRouteItemsContextType>(
    SelectedRouteItemsContext
  );

  const onSelect = (route_item: RouteObject) => {
    console.log("on route item selected");
    setShowRouteItemSelector(false);
  };

  const [routeItemType, setRouteItemType] = useState("Orders");

  const filteredOrders = orders.filter(
    (order) => !ordersInRoutes.has(order.id)
  );

  const insertOrders = () => {
    return filteredOrders.map((order) => {
      return (
        <tr
          key={order.id}
          className="bg-white divide-y divide-gray-100 text-left"
        >
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900  ">
            {order.name}
          </td>
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ">
            {order.street} {order.city}, {order.state} {order.zipcode}
          </td>
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center hover:text-gray-900 ">
            {order.dumpster_size}
          </td>

          {selectedDate.toDateString() === order.pickup_date && (
            <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ">
              Pickup
            </td>
          )}
          {selectedDate.toDateString() === order.delivery_date && (
            <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ">
              Delivery
            </td>
          )}
          <td>
            <button
              onClick={() => onSelect(order)}
              className="px-4 py-2  text-sm text-gray-700 hover:underline hover:underline-offset-1  active:scale-95"
            >
              Select
            </button>
          </td>
        </tr>
      );
    });
  };

  const insertLandfills = () => {
    return landfills.map((landfill) => {
      return (
        <tr
          key={landfill.id}
          className="bg-white divide-y divide-gray-100 text-left"
        >
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ">
            {landfill.name}
          </td>
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            {landfill.street} {landfill.city}, {landfill.state}{" "}
            {landfill.zipcode}
          </td>
          <td>
            <button
              onClick={() => onSelect(landfill)}
              className="px-4 py-2  text-sm text-gray-700 hover:underline hover:underline-offset-1 text-center active:scale-95"
            >
              Select
            </button>
          </td>
        </tr>
      );
    });
  };

  const insertDepots = () => {
    return depots.map((depot) => {
      return (
        <tr
          key={depot.id}
          className="bg-white divide-y divide-gray-100 text-left"
        >
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            {depot.name}
          </td>
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            {depot.street} {depot.city}, {depot.state} {depot.zipcode}
          </td>
          <td>
            <button
              onSelect={() => onSelect(depot)}
              className="px-4 py-2  text-sm text-gray-700 hover:underline hover:underline-offset-1 text-center active:scale-95"
            >
              Select
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative flex flex-col bg-white z-20 p-4 w-1/2  h-3/5">
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
          <div className=" max-h-64 w-full mt-6 px-4">
            {routeItemType === "Orders" && filteredOrders.length > 0 && (
              <table className="w-full bg-white border border-gray-200 divide-y divide-gray-100 ">
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
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {insertOrders()}
                </tbody>
              </table>
            )}{" "}
            {}
            {routeItemType === "Landfills" && landfills.length > 0 && (
              <table className="w-full bg-white border border-gray-200 divide-y divide-gray-100 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Address
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {insertLandfills()}
                </tbody>
              </table>
            )}
            {routeItemType === "Depots" && depots.length > 0 && (
              <table className="w-full bg-white border border-gray-200 divide-y divide-gray-100 ">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Address
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {insertDepots()}
                </tbody>
              </table>
            )}
            {routeItemType === "Orders" && filteredOrders.length === 0 && (
              <div className="flex flex-col items-center mt-6">
                <div className="w-96">
                  All orders are currently assigned. To prevent duplication of
                  orders you must delete an order from a route item in order to
                  insert it into a new location.{" "}
                </div>
                <ClipboardDocumentIcon className="w-20 h-20 my-4 mb-10 black mx-auto text-stone-300 text-green-200" />
              </div>
            )}
            {routeItemType === "Landfills" && landfills.length === 0 && (
              <div className="py-4">
                Add a landfill to get started.
                <div className="py-6">
                  <TrashIcon className="w-16 h-16 text-black inline-block ml-2" />
                </div>
              </div>
            )}
            {routeItemType === "Depots" && depots.length === 0 && (
              <div className="bg-slate-700 text-white rounded-md p-2 absolute top-full left-0 mt-4 ml-4">
                The depot locations are where the dumpsters depart from and
                return to at the end of their shift.
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              className="absolute m-4 bottom-0 right-0 mt-6 px-4 py-2 bg-white border hover:bg-black hover:text-white active:scale-95 rounded"
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
