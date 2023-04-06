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
    initializeDrivers,
    initializeLandfills,
    initializeOrders,
    initializeTruckRoutes,
    initializeVehicles,
    initializeRegions,
    setAlert,
  } = bindActionCreators(actionCreators, dispatch);
  const region = useSelector((state: State) => state.setRegion)
  const alert_data = useSelector((state: State) => state.alert_data);
  const date = new Date();

  const [createRegionFormActive, setCreateRegionFormActive] = useState(false);

  useEffect(() => {
    if (region) {
      initializeDepots(region);
      // initializeDrivers(region);
      initializeLandfills(region);
      initializeOrders(region, date.toDateString());
      // initializeTruckRoutes(region, date);
      // initializeVehicles(region);
    }else{
      initializeRegions();

    }
  }, [region]);


const onSuccess = () => {
  setAlert("OHH YEAAA", "success", 3000, alert_data.id+1);
}

const onCreateRegion = () => {
  setCreateRegionFormActive(true);
}





return (
  <div className="bg-slate-100 flex h-full">
    <Alert />
    <div className="w-64 bg-slate-50">
      <SideNav />
    </div>
    <div className="mx-auto flex flex-col w-2/3">
      <div className="flex flex-row justify-end">
        {/* <button onClick={onCreateRegion} className="self-end mx-4 my-2 text-slate-700 hover:text-black hover:underline hover:underline-offset-1 active:scale-95">
          Add Region
        </button> */}
        <RegionSelector />
      </div>



      <div className="py-5"></div>
      <OrderTable  />
      <div className="py-5"></div>
      <LandfillTable  />
      <div className="py-5"></div>
      <DepotTable />
      <div className="py-5"></div>
    </div>
    {createRegionFormActive && <CreateRegionForm setActive={setCreateRegionFormActive}   /> }

  </div>
);
};

export default HomePage;
