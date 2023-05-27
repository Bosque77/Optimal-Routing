import React, { useEffect, useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import DepotTable from "../../components/DepotTable";
import LandfillTable from "../../components/LandfillTable";
import OrderTable from "../../components/OrderTable";
import Alert from "../../components/Alert";
import RegionSelector from "../../components/RegionSelector";
import CreateRegionForm from "../../components/CreateRegionForm";

const HomePage = () => {
  const dispatch = useDispatch();

  const {
    initializeDepots,
    initializeLandfills,
    initializeOrders,
    initializeTruckRoutes,
    initializeRegions,
  } = bindActionCreators(actionCreators, dispatch);
  const region = useSelector((state: State) => state.setRegion);
  const alert_data = useSelector((state: State) => state.alert_data);
  const date = new Date();

  const [createRegionFormActive, setCreateRegionFormActive] = useState(false);

  useEffect(() => {
    if (region) {
      initializeDepots(region);
      initializeLandfills(region);
      initializeOrders(region, date.toDateString());
      initializeTruckRoutes(region, date.toDateString());
    } else {
      initializeRegions();
    }
  }, [region]);


  const onCreateRegion = () => {
    setCreateRegionFormActive(true);
  };

  return (
    <div className="flex min-h-screen bg-slate-100 overflow-y-auto">
      <Alert />
      <div className="w-64 bg-slate-50">
        <SideNav />
      </div>
      <div className="mx-auto flex flex-col w-2/3">
        <div className="flex flex-row justify-end">
          <RegionSelector />
        </div>

        <div className="py-5"></div>
        <OrderTable />
        <div className="py-5"></div>
        <LandfillTable />
        <div className="py-5"></div>
        <DepotTable />
        <div className="py-5"></div>
      </div>
      {createRegionFormActive && (
        <CreateRegionForm setActive={setCreateRegionFormActive} />
      )}
    </div>
  );
};

export default HomePage;
