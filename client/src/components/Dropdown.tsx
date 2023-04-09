import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../state";
import { Order } from "../types";

interface prop {
  selected_date: Date;
}

const DropdownTable = ({ selected_date }: prop) => {
  const orders = useSelector((state: State) => state.orders);
  const depots = useSelector((state: State) => state.depots);
  const landfills = useSelector((state: State) => state.landfills);
  const [selectedOrdersTable, setSelectedOrdersTable] = useState(false);
  const [selectedDepotsTable, setSelectedDepotsTable] = useState(false);
  const [selectedLandfillsTable, setSelectedLandfillsTable] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [depotsSelectAll, setDepotsSelectAll] = useState(false);

  const [selectedDepots, setSelectedDepots] =  useState<Set<string>>(new Set());

  const handleDepotSelection = (depotId : string, isChecked:boolean) => {
    if (isChecked) {
      setSelectedDepots((prevSelectedDepots) => new Set([...prevSelectedDepots, depotId]));
    } else {
      setSelectedDepots((prevSelectedDepots) => {
        prevSelectedDepots.delete(depotId);
        return new Set([...prevSelectedDepots]);
      });
    }
  };

  const handleSelectAll = (e : any) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedDepots(new Set(depots.map((depot) => depot.id)));
    } else {
      setSelectedDepots(new Set());
    }
  };

  const insertOrders = () => {
    return orders.map((order) => {
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
            />
          </td>
        </tr>
      );
    });
  };

  const insertLandfills = () => {
    return landfills.map((landfill) => {
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

  return (
    <>
      <div className="flex flex-col ">
        <div className="relative inline-block">
          <div ref={dropdownRef} className="relative inline-block text-left">
            <button
              className="w-64 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
              onClick={() => setSelectedOrdersTable(!selectedOrdersTable)}
            >
              Orders
            </button>
            <div className="grid grid-cols-3 gap-4"></div>
            {selectedOrdersTable && orders && (
              <table className="table-auto mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
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
            )}
          </div>
        </div>
        <div className="relative inline-block ">
          <button
            className="w-64 mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            onClick={() => setSelectedLandfillsTable(!selectedLandfillsTable)}
          >
            Landfills
          </button>
          {selectedLandfillsTable && landfills && (
            <table className="table-auto mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
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
        </div>
        <div className="relative inline-block ">
          <button
            className="w-64 mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            onClick={() => setSelectedDepotsTable(!selectedDepotsTable)}
          >
            Depots
          </button>
          {selectedDepotsTable && depots && (
            <table className="table-auto mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
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
                      onChange={handleSelectAll}
                    />
                    </div>

                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {insertDepots()}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default DropdownTable;
