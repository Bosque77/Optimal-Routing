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
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {depot.name}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {depot.street}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {depot.city}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {depot.zipcode}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {depot.latitude}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
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
            <table className="min-w-full">
              <thead className="border-b bg-slate-200">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Street
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    City
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Zipcode
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                  >
                    Latitude
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
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
