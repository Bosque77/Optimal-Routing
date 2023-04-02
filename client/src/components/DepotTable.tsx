import React, { useState } from "react";
import DepotList from "./DepotList";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import CreateDepotForm from "./CreateDepotForm";
import ConfirmDelete from "./ConfirmDelete";
import { Depot } from "../types";
import { State } from "../state";
import { useSelector } from "react-redux";




const DepotTable = () => {

  const depots = useSelector((state: State) => state.depots);
  
  const [showInfo, setShowInfo] = useState(false);
  const [createDepotModalActive, setCreateDepotModalActive] = useState(false);
  const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);
  const [depot, setDepot] = useState<Depot | undefined>(undefined);

  const onCreateDepot = () => {
    setDepot(undefined)
    setCreateDepotModalActive(true);
  };

  return (
    <div>
      <div className="bg-white drop-shadow-md rounded">
        <div className="bg-indigo-500 pt-2 opacity-50"></div>
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
                The depot locations are where the dumpsters depart from and
                return to at the end of their shift.
              </div>
            )}
          </div>
        </div>

        <div className="text-right my-5 mr-5">
          <button
            className="bg-slate-700 text-white px-7 py-1 rounded-full drop-shadow-md hover:bg-stone-900 hover:text-white hover:drop-shadow-md active:drop-shadow-none active:scale-95 modal-trigger "
            onClick={() => onCreateDepot()}
          >
            Add Depot
          </button>
        </div>
        <div className="drop-shadow-sm px-4">
          <DepotList depots={depots} setDepot={setDepot} setCreateDepotModalActive={setCreateDepotModalActive} setConfirmDeleteActive={setConfirmDeleteActive} />
        </div>
      </div>
      {createDepotModalActive && (
        <CreateDepotForm setActive={setCreateDepotModalActive} depot={depot}/>
      )}
      {confirmDeleteActive && <ConfirmDelete setActive={setConfirmDeleteActive} depot={depot} />}
    </div>
  );
};

export default DepotTable;
