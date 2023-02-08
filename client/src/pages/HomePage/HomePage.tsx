import React, { useEffect, useState } from "react";
import SideNav from "../../components/SideNav/SideNav";
import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import DepotTable from "../../components/DepotTable";
import LandfillTable from "../../components/LandfillTable";
import OrderTable from "../../components/OrderTable";
import CreateOrderForm from "../../components/CreateOrderForm";
import CreateDepotForm from "../../components/CreateDepotForm";
import CreateLandfillForm from "../../components/CreateLandfillForm";
import Alert from "../../components/Alert";
import RegionSelector from "../../components/RegionSelector";

const HomePage = () => {
  const dispatch = useDispatch();

  const [createOrderModalActive, setCreateOrderModalActive] = useState(false);
  const [createLandfillModalActive, setCreateLandfillModalActive] = useState(false);
  const [createDepotModalActive, setCreateDepotModalActive] = useState(false);


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
  setAlert("OHH YEAAA", "success", 3000);
}





return (
  <div className="bg-slate-100 flex h-full">
    <Alert />
    <div className="w-64 bg-slate-50">
      <SideNav />
    </div>
    <div className="mx-auto flex flex-col w-2/3">
      <div className="flex flex-row justify-end">
        <RegionSelector />
      </div>



      <div className="py-5"></div>
      <OrderTable setCreateOrderModalActive={setCreateOrderModalActive} />
      <div className="py-5"></div>
      <LandfillTable setCreateLandfillModalActive={setCreateLandfillModalActive} />
      <div className="py-5"></div>
      <DepotTable setCreateDepotModalActive={setCreateDepotModalActive}/>
      <div className="py-5"></div>
    </div>

    {createOrderModalActive && (
      <CreateOrderForm setActive={setCreateOrderModalActive} />
    )}
    {createLandfillModalActive && (
      <CreateLandfillForm setActive={setCreateLandfillModalActive} />
    )}
        {createDepotModalActive && (
      <CreateDepotForm setActive={setCreateDepotModalActive} />
    )}

  </div>
);
};

export default HomePage;
