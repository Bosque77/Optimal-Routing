import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../state";
import { useContext } from 'react';
import { SelectedRouteItemsContext, SelectedRouteItemsContextType  } from './SelectedRouteItemsContext';
import { Order } from "../types";
import RouteQueryService from "../services/route_query";

interface prop {
  selected_date: Date;
}

const DropdownTable = ({ selected_date }: prop) => {
  const orders = useSelector((state: State) => state.orders);
  const depots = useSelector((state: State) => state.depots);
  const landfills = useSelector((state: State) => state.landfills);
  const [number_of_trucks, setNumberOfTrucks] = useState("1");
  const [selectedOrdersTable, setSelectedOrdersTable] = useState(false);
  const [selectedDepotsTable, setSelectedDepotsTable] = useState(false);
  const [selectedLandfillsTable, setSelectedLandfillsTable] = useState(false);

  const {
    selectedDepots,
    setSelectedDepots,
    selectedLandfills,
    setSelectedLandfills,
    selectedOrders,
    setSelectedOrders,
  } = useContext<SelectedRouteItemsContextType>(SelectedRouteItemsContext);
  const dropdownRef = useRef<HTMLDivElement | null>(null);


  const computeRoute = () => {
    const full_selected_orders = orders.filter((order) => selectedOrders.has(order.id));
    const full_selected_landfills = landfills.filter((landfill) => selectedLandfills.has(landfill.id));
    const full_selected_depots = depots.filter((depot) => selectedDepots.has(depot.id));
    const route_query = {
      landfills: full_selected_landfills,
      depots: full_selected_depots,
      orders: full_selected_orders,
      num_of_routes: parseInt(number_of_trucks),
      date: selected_date.toDateString(),
    }
    console.log('sending the route query')
    console.log(route_query)
    const response = RouteQueryService.createRoutes(route_query);
    console.log(response)

  }




  const handleOrderSelection = (orderId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedOrders(
        (prevSelectedOrders) => new Set([...prevSelectedOrders, orderId])
      );
    } else {
      setSelectedOrders((prevSelectedOrders) => {
        prevSelectedOrders.delete(orderId);
        return new Set([...prevSelectedOrders]);
      });
    }
  };

  const handleDepotSelection = (depotId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedDepots(
        (prevSelectedDepots) => new Set([...prevSelectedDepots, depotId])
      );
    } else {
      setSelectedDepots((prevSelectedDepots) => {
        prevSelectedDepots.delete(depotId);
        return new Set([...prevSelectedDepots]);
      });
    }
  };

  const handleLandfillSelection = (landfillId: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedLandfills(
        (prevSelectedLandfills) =>
          new Set([...prevSelectedLandfills, landfillId])
      );
    } else {
      setSelectedLandfills((prevSelectedLandfills) => {
        prevSelectedLandfills.delete(landfillId);
        return new Set([...prevSelectedLandfills]);
      });
    }
  };

  const handleOrderSelectAll = (e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedOrders(new Set(orders.map((order) => order.id)));
    } else {
      setSelectedOrders(new Set());
    }
  };

  const handleDepotSelectAll = (e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedDepots(new Set(depots.map((depot) => depot.id)));
    } else {
      setSelectedDepots(new Set());
    }
  };

  const handleLandfillSelectAll = (e: any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedLandfills(new Set(landfills.map((landfill) => landfill.id)));
    } else {
      setSelectedLandfills(new Set());
    }
  };

  const insertOrders = () => {
    return orders.map((order) => {
      const isChecked = selectedOrders.has(order.id);
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
          {selected_date.toDateString() === order.pickup_date && (
            <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center">
              Pickup
            </td>
          )}
          {selected_date.toDateString() === order.delivery_date && (
            <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center">
              Delivery
            </td>
          )}
          <td>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded w-16"
              checked={isChecked}
              onChange={(e) => handleOrderSelection(order.id, e.target.checked)}
            />
          </td>
        </tr>
      );
    });
  };

  const insertLandfills = () => {
    return landfills.map((landfill) => {
      const isChecked = selectedLandfills.has(landfill.id);
      return (
        <tr key={landfill.id} className="bg-white divide-y divide-gray-100">
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            {landfill.name}
          </td>
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            {landfill.street} {landfill.city}, {landfill.state}{" "}
            {landfill.zipcode}
          </td>
          <td>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded w-16"
              checked={isChecked}
              onChange={(e) =>
                handleLandfillSelection(landfill.id, e.target.checked)
              }
            />
          </td>
        </tr>
      );
    });
  };

  const insertDepots = () => {
    return depots.map((depot) => {
      const isChecked = selectedDepots.has(depot.id);
      return (
        <tr key={depot.id} className="bg-white divide-y divide-gray-100">
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            {depot.name}
          </td>
          <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
            {depot.street} {depot.city}, {depot.state} {depot.zipcode}
          </td>
          <td>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 rounded w-16"
              checked={isChecked}
              onChange={(e) => handleDepotSelection(depot.id, e.target.checked)}
            />
          </td>
        </tr>
      );
    });
  };

  // close the dialog box for the orders
  const handleOrdersClose = () => {
    setSelectedOrdersTable(false);
  };

  // close the dialog box for the landfills
  const handleLandfillsClose = () => {
    setSelectedLandfillsTable(false);
  };

  // close the dialog box for the depots
  const handleDepotsClose = () => {
    setSelectedDepotsTable(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="my-2">Select Route Entries</div>
        <div className="flex w-64 my-2">
          <div className="py-2 mt-2 mr-4 grow text-center">
            {" "}
            Number of Trucks
          </div>
          <input
            className="w-12 border text-center rounded-md border-gray-300   mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
            onChange={(e) => setNumberOfTrucks(e.target.value)}
            type="number"
            value={number_of_trucks}
          ></input>
        </div>

        <div className="relative inline-block">
          <div ref={dropdownRef} className="relative inline-block text-left">
            <button
              className="w-64 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
              onClick={() => setSelectedOrdersTable(!selectedOrdersTable)}
            >
              Orders
            </button>
          </div>
        </div>
        <div className="relative inline-block ">
          <button
            className="w-64 mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            onClick={() => setSelectedLandfillsTable(!selectedLandfillsTable)}
          >
            Landfills
          </button>
        </div>
        <div className="relative inline-block ">
          <button
            className="w-64 mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            onClick={() => setSelectedDepotsTable(!selectedDepotsTable)}
          >
            Depots
          </button>
        </div>
        <div className="relative inline-block my-4">
          <button className="w-64 text-center bg-white border rounded py-2 hover:text-white hover:bg-slate-700 active:scale-95"
          onClick={computeRoute}
          >
            Compute
          </button>
        </div>
      </div>
      {selectedLandfillsTable && landfills && (
        <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="px-6 py-6  z-20  bg-white rounded flex flex-col">
            <table className="table-auto mt-2 bg-white border border-gray-200 divide-y divide-gray-100 ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Address
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    <div className="flex">
                      Select All
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded ml-4"
                        onChange={handleLandfillSelectAll}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {insertLandfills()}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                className="mt-6 px-4 py-2 bg-white border hover:bg-black hover:text-white active:scale-95 rounded"
                onClick={handleLandfillsClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedDepotsTable && depots && (
        <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="px-6 py-6  z-20  bg-white rounded flex flex-col">
            <table className="table-auto mt-2 bg-white border border-gray-200 divide-y divide-gray-100 ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Address
                  </th>
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    <div className="flex">
                      Select All
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded ml-4"
                        onChange={handleDepotSelectAll}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {insertDepots()}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                className="mt-6 px-4 py-2 bg-white border hover:bg-black hover:text-white active:scale-95 rounded"
                onClick={handleDepotsClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedOrdersTable && orders && (
        <div className="h-screen w-screen flex items-center justify-center fixed top-0 left-0">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="px-6 py-6  z-20  bg-white rounded flex flex-col">
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
                  <th className="px-2 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    <div className="flex">
                      Select All
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600 rounded ml-4"
                        onChange={handleOrderSelectAll}
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {insertOrders()}
              </tbody>
            </table>
            <div className="flex justify-end">
              <button
                className="mt-6 px-4 py-2 bg-white border hover:bg-black hover:text-white active:scale-95 rounded"
                onClick={handleOrdersClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownTable;
