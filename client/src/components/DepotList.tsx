import React, { useState } from "react";
import { Depot } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useEffect } from "react";
// import EditDepotForm from "./EditDepotForm";
import ConfirmDelete from "./ConfirmDelete";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";

interface prop {
  depots: Depot[];
  setCreateDepotModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmDeleteActive: React.Dispatch<React.SetStateAction<boolean>>;
  setDepot: React.Dispatch<React.SetStateAction<Depot | undefined>>;
}

const DepotList = ({
  depots,
  setCreateDepotModalActive,
  setConfirmDeleteActive,
  setDepot,
}: prop) => {
  const dispatch = useDispatch();

  const { updateDepot } = bindActionCreators(actionCreators, dispatch);

  const changedepotStatus = (depot: Depot) => {
    console.log("inside on click");
    const new_depot = { ...depot };
    if (depot.active) {
      new_depot.active = false;
    } else {
      new_depot.active = true;
    }
    updateDepot(new_depot);
  };

  const onEditDepot = (depot: Depot) => {
    setDepot(depot);
    setCreateDepotModalActive(true);
  };

  const onDeleteDepot = (depot: Depot) => {
    console.log("inside delete depot");
    setDepot(depot);
    setConfirmDeleteActive(true);
  };

  const insertdepots = () => {
    return depots.map((depot) => (
      <tr key={depot.id} className="border-b bg-white">
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center ">
          {depot.name}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center ">
          {depot.street}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center ">
          {depot.city}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center ">
          {depot.zipcode}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center ">
          {depot.latitude}
        </td>
        <td className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-center ">
          {depot.longitude}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
          <button onClick={() => onEditDepot(depot)}>
            <PencilIcon className="w-6 h-6 mr-3 black stroke-1 cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:drop-shadow-none active:scale-95" />
          </button>
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
          <button onClick={()=> onDeleteDepot(depot)}>
            <TrashIcon className="w-6 h-6 mr-3 black stroke-1  cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:drop-shadow-none active:scale-95" />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-100 ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Street
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Zipcode
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Latitude
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Longitude
                  </th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>{insertdepots()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepotList;
