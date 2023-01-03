import React, { useEffect, useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import DepotList from "../../components/DepotList";
import LandfillTable from "../../components/LandfillTable";


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
        <LandfillTable />

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
