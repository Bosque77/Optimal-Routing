import React, { useEffect, useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import LandfillList from "../../components/LandfillList";
import DepotList from "../../components/DepotList";
import { InformationCircleIcon } from "@heroicons/react/24/outline";


const HomePage = () => {
  const dispatch = useDispatch();
  const {
    initializeDepots,
    initializeDrivers,
    initializeLandfills,
    initializeOrders,
    initializeTruckRoutes,
    initializeVehicles,
    initializeRegions,
  } = bindActionCreators(actionCreators, dispatch);
  const region = useSelector((state: State) => state.setRegion);
  const date = Date();

  useEffect(() => {
    if (!region) {
      initializeRegions();
    }
    if (region) {
      initializeDepots(region);
      // initializeDrivers(region);
      initializeLandfills(region);
      // initializeOrders(region, date);
      // initializeTruckRoutes(region, date);
      // initializeVehicles(region);
    }
  }, [region]);

  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-slate-100 flex h-screen">
      <div className="w-64 bg-slate-50">
        <SideNav />
      </div>
      <div className="mx-auto flex flex-col">
        <div className="py-5"></div>
        <div className="bg-white drop-shadow-md rounded">
          <div className="bg-lime-500 pt-2"></div>
          <div className="relative">
            <div className="flex flex-row mt-4 ml-4">
              <InformationCircleIcon
                className="w-6 h-6 mr-3 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                onMouseEnter={() => setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
              />
              <h2 className="text-left font-sans text-black text-xl">
                Landfills
              </h2>
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

        <div className="bg-white p-3 mt-10 pt-0 drop-shadow-md rounded">
          <h2 className="text-left font-sans mt-8 text-gray-600 text-lg">
            Depots
          </h2>
          <div className="drop-shadow-sm">
            <DepotList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
