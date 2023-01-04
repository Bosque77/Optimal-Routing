import React, { useState } from "react";
import { Depot } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useEffect } from "react";
import EditDepotForm from "./EditDepotForm";
import CreateDepotForm from "./CreateDepotForm";
import ConfirmDelete from "./ConfirmDelete";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const DepotList = () => {
  const dispatch = useDispatch();

  const { updateDepot } = bindActionCreators(actionCreators, dispatch);

  const depots = useSelector((state: State) => state.depots);
  const [depot, setdepot] = useState<Depot>(depots[0]);
  const [editFormActive, setEditFormActive] = useState(false);
  const [createFormActive, setCreateFormActive] = useState(false);
  const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);

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

  const editdepot = (depot: Depot) => {
    setdepot(depot);
    setEditFormActive(true);
  };

  const onDeletedepot = (depot: Depot) => {
    console.log("inside delete depot");
    setdepot(depot);
    setConfirmDeleteActive(true);
  };

  const onCreatedepot = () => {
    setCreateFormActive(true);
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
          <PencilIcon className="w-6 h-6 mr-3 black stroke-1 hover:text-indigo-900 cursor-pointer active:drop-shadow-none active:scale-95" />
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
          <TrashIcon className="w-6 h-6 mr-3 black stroke-1 hover:text-red-900 cursor-pointer active:drop-shadow-none active:scale-95" />
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
                {/* <div className="col offset-s10">
                    <button className='btn black offset-s10' onClick={() => onCreatedepot()}>New depot</button>
                </div> */}

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

              {/* {editFormActive && <EditDepotForm depot={depot} setActive={setEditFormActive}  />}
            {createFormActive && <CreateDepotForm setActive={setCreateFormActive}  />}
            {confirmDeleteActive && <ConfirmDelete setActive={setConfirmDeleteActive} depot={depot} />} */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DepotTable = () => {
  const [showInfo, setShowInfo] = useState(false);


  return (
    <div className="bg-white drop-shadow-md rounded">
      <div className="bg-indigo-500 pt-2"></div>
      <div className="relative">
        <div className="flex flex-row mt-4 ml-4">
          <InformationCircleIcon
            className="w-6 h-6 mr-3 text-indigo-500 hover:text-indigo-800 cursor-pointer"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          />
          <h2 className="text-left font-sans text-black text-xl">Depots</h2>
          {showInfo && (
            <div className="bg-slate-700 text-white rounded-md p-2 absolute top-full left-0 mt-4 ml-4">
              The depot locations are where the dumpsters depart and come back to.
            </div>
          )}
        </div>
      </div>

      <div className="text-right my-5 mr-5">
        <button className="bg-slate-700 text-white px-7 py-1 rounded-full drop-shadow-md hover:bg-stone-900 hover:text-slate-100 hover:drop-shadow-md active:drop-shadow-none active:scale-95">
          Add Depot
        </button>
      </div>
      <div className="drop-shadow-sm px-4">
        <DepotList />
      </div>
    </div>
  );
};

export default DepotTable;
