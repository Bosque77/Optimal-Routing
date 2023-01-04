import React, { useState } from "react";
import { Landfill } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import EditLandfillForm from "./EditLandfillForm";
import CreateLandfillForm from "./CreateLandfillForm";
import ConfirmDelete from "./ConfirmDelete";

const LandfillList = () => {
  const dispatch = useDispatch();

  const { updateLandfill } = bindActionCreators(actionCreators, dispatch);



  const landfills = useSelector((state: State) => state.landfills);
  const [landfill, setLandfill] = useState<Landfill>(landfills[0]);
  const [editFormActive, setEditFormActive] = useState(false);
  const [createFormActive, setCreateFormActive] = useState(false);
  const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);

  const changeLandfillStatus = (landfill: Landfill) => {
    console.log("inside on click");
    const new_landfill = { ...landfill };
    if (landfill.active) {
      new_landfill.active = false;
    } else {
      new_landfill.active = true;
    }
    updateLandfill(new_landfill);
  };

  const editLandfill = (landfill: Landfill) => {
    setLandfill(landfill);
    setEditFormActive(true);
  };

  const onDeleteLandfill = (landfill: Landfill) => {
    console.log("inside delete landfill");
    setLandfill(landfill);
    setConfirmDeleteActive(true);
  };

  const onCreateLandfill = () => {
    setCreateFormActive(true);
  };

  const insertLandfills = () => {
    return landfills.map((landfill) => (
      <tr key={landfill.id} className="border-b bg-white">
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {landfill.name}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {landfill.street}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
          {landfill.city}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap text-right">
          {landfill.zipcode}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap text-right">
          {landfill.latitude}
        </td>
        <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap text-right">
          {landfill.longitude}
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
                {/* <div>
                <br></br>
                <div className="col offset-s10">
                    <button className='btn black offset-s10' onClick={() => onCreateLandfill()}>New Landfill</button>
                </div>

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
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                  >
                    Zipcode
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                  >
                    Latitude
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                  >
                    Longitude
                  </th>
                  <th></th>
                  <th></th>
                  {/* <th>Active</th> */}
                </tr>
              </thead>

              <tbody>{insertLandfills()}</tbody>

              {/* {editFormActive && (
        <EditLandfillForm landfill={landfill} setActive={setEditFormActive} />
      )}
      {createFormActive && (
        <CreateLandfillForm setActive={setCreateFormActive} />
      )}
      {confirmDeleteActive && (
        <ConfirmDelete setActive={setConfirmDeleteActive} landfill={landfill} />
      )} */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandfillTable = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white drop-shadow-md rounded">
      <div className="bg-amber-900 pt-2"></div>
      <div className="relative">
        <div className="flex flex-row mt-4 ml-4">
          <InformationCircleIcon
            className="w-6 h-6 mr-3 text-amber-900 hover:text-indigo-800 cursor-pointer"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          />
          <h2 className="text-left font-sans text-black text-xl">Landfills</h2>
          {showInfo && (
            <div className="bg-slate-700 text-white rounded-md p-2 absolute top-full left-0 mt-4 ml-4">
              Add landfills at the locations where the dumpsters can be emptied.
            </div>
          )}
        </div>
      </div>

      <div className="text-right my-5 mr-5">
        <button className="bg-slate-700 text-white px-7 py-1 rounded-full drop-shadow-md hover:bg-stone-900 hover:text-slate-100 hover:drop-shadow-md active:drop-shadow-none active:scale-95">
          Add Landfill
        </button>
      </div>
      <div className="drop-shadow-sm px-4">
        <LandfillList />
      </div>
    </div>
  );
};

export default LandfillTable;
