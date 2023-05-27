import React, { useState } from "react";
import { Landfill } from "../../../shared/types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import LandfillList from "./LandfillList";
import ConfirmDelete from "./ConfirmDelete";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import CreateLandfillForm from "./CreateLandfillForm";
import { TrashIcon } from "@heroicons/react/24/solid";

const LandfillTable = () => {
  const landfills = useSelector((state: State) => state.landfills);
  const [showInfo, setShowInfo] = useState(false);
  const [landfill, setLandfill] = useState<Landfill | undefined>(undefined);
  const [createLandfillModalActive, setCreateLandfillModalActive] =
    useState(false);
  const [confirmDeleteActive, setConfirmDeleteActive] =
    useState<boolean>(false);

  const onCreateLandfill = () => {
    setLandfill(undefined);
    setCreateLandfillModalActive(true);
  };

  return (
    <div>
      <div className="bg-white drop-shadow-md rounded">
        <div className="bg-stone-200 pt-2 "></div>
        <div className="relative">
          <div className="flex flex-row mt-4 ml-4">
            <InformationCircleIcon
              className="w-6 h-6 mr-3 text-stone-500 hover:text-indigo-800 cursor-pointer"
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
            />
            <h2 className="text-left font-sans text-black text-xl">
              Landfills
            </h2>
            {showInfo && (
              <div className="bg-slate-700 text-white rounded-md p-2 absolute top-full left-0 mt-4 ml-4">
                Add landfills at the locations where the dumpsters can be
                emptied.
              </div>
            )}
          </div>
        </div>

        <div className="text-right my-5 mr-5">
          <button
            className="bg-slate-700 text-white px-7 py-1 rounded-full drop-shadow-md hover:bg-stone-900 hover:text-slate-100 hover:drop-shadow-md active:drop-shadow-none active:scale-95"
            onClick={onCreateLandfill}
          >
            Add Landfill
          </button>
        </div>
        <div className="drop-shadow-sm px-4">
          {landfills.length === 0 ? (
            <div className="py-4">
              Add a landfill to get started.
              <div className="py-6">
                <TrashIcon className="w-16 h-16 text-stone-400 inline-block ml-2" />
              </div>
            </div>
          ) : (
            <LandfillList
              landfills={landfills}
              setCreateLandfillModalActive={setCreateLandfillModalActive}
              setConfirmDeleteActive={setConfirmDeleteActive}
              setLandfill={setLandfill}
            />
          )}
        </div>
      </div>
      {createLandfillModalActive && (
        <CreateLandfillForm
          setActive={setCreateLandfillModalActive}
          landfill={landfill}
        />
      )}
      {confirmDeleteActive && (
        <ConfirmDelete setActive={setConfirmDeleteActive} landfill={landfill} />
      )}
    </div>
  );
};

export default LandfillTable;
