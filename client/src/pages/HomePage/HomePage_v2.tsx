import React, { useEffect, useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import DepotTable from "../../components/DepotTable";
import LandfillTable from "../../components/LandfillTable";
import OrderTable from "../../components/OrderTable";
import CreateOrderFrom from "../../components/CreateOrderForm_v2";

const HomePage = () => {
  const dispatch = useDispatch();

  const [createOrderModalActive, setCreateOrderModalActive] = useState(false);

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
      initializeOrders(region, date);
      // initializeTruckRoutes(region, date);
      // initializeVehicles(region);
    }
  }, [region]);

  return (
    <div className="bg-slate-100 flex h-full">
      <div className="w-64 bg-slate-50">
        <SideNav />
      </div>
      <div className="mx-auto flex flex-col">
        <div className="py-5"></div>
        <OrderTable setCreateOrderModalActive={setCreateOrderModalActive} />
        <div className="py-5"></div>
        <LandfillTable />
        <div className="py-5"></div>
        <DepotTable />
        <div className="py-5"></div>
      </div>

      {createOrderModalActive && (
        <CreateOrderFrom setActive={setCreateOrderModalActive} />
      )}
    </div>
  );
};

export default HomePage;
