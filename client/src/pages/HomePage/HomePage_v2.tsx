import React, { useEffect } from "react";
import SideNav from "../../components/SideNav/SideNav";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import LandfillList from "../../components/LandfillList";
import DepotList from "../../components/DepotList";

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

  return (
    <div className="bg-slate-100 flex h-screen">
      <div className="w-64 bg-slate-50">
        <SideNav />
      </div>
      <div className="mx-auto flex flex-col">
        <div className="py-5"></div>
        <div className="bg-white p-4 pt-0 drop-shadow-md rounded">
          <h2 className="text-left font-sans mt-8 text-gray-600 text-lg">
            Landfills
          </h2>
          <div className="text-right my-5 mr-5">
          <button className="bg-slate-100 text-stone-900 px-7 py-1 rounded-full drop-shadow-md hover:bg-stone-900 hover:text-slate-100 hover:drop-shadow-md active:drop-shadow-none active:scale-95">
  Add Landfill
</button>
          </div>
          <div className="drop-shadow-sm">
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
