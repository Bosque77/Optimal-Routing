import React, { useState } from "react";
import { Landfill } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import LandfillList from "./LandfillList";
import ConfirmDelete from "./ConfirmDelete";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import CreateLandfillForm from "./CreateLandfillForm";



const LandfillTable = () => {
  const landfills = useSelector((state: State) => state.landfills);
  const [showInfo, setShowInfo] = useState(false);
  const [landfill, setLandfill] = useState<Landfill|undefined>(undefined);
  const [createLandfillModalActive, setCreateLandfillModalActive] =
    useState(false);
  const [confirmDeleteActive, setConfirmDeleteActive] = useState<boolean>(false);

  const onCreateLandfill = () => {
    setCreateLandfillModalActive(true);
  };

  return (
    <div>
      <div className="bg-white drop-shadow-md rounded">
        <div className="bg-amber-900 pt-2 opacity-50"></div>
        <div className="relative">
          <div className="flex flex-row mt-4 ml-4">
            <InformationCircleIcon
              className="w-6 h-6 mr-3 text-amber-900 hover:text-indigo-800 cursor-pointer"
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
              <div className="text-center justify-center flex w-full py-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="64"
                  height="64"
                  fill="currentColor"
                >
                  <path d="M4.5 2h15c.825 0 1.5.675 1.5 1.5V4c0 .825-.675 1.5-1.5 1.5h-15C3.675 5.5 3 4.825 3 4V3.5C3 2.675 3.675 2 4.5 2zm14.5 6v13.5c0 .825-.675 1.5-1.5 1.5h-12c-.825 0-1.5-.675-1.5-1.5V8H2v15c0 1.104.896 2 2 2h16c1.104 0 2-.896 2-2V8h-1z" />
                  <path d="M8 10h1v8H8zm3 0h1v8h-1zm3 0h1v8h-1z" />
                </svg>
              </div>
            </div>
          ) : (
            <LandfillList landfills={landfills} setCreateLandfillModalActive={setCreateLandfillModalActive} setConfirmDeleteActive={setConfirmDeleteActive} setLandfill={setLandfill} />
          )}
        </div>
      </div>
      {createLandfillModalActive && (
        <CreateLandfillForm setActive={setCreateLandfillModalActive} landfill={landfill}/>
      )}
      {confirmDeleteActive && ( <ConfirmDelete setActive={setConfirmDeleteActive} /> )}
    </div>
  );
};

export default LandfillTable;
