import React, { useEffect } from "react";
import SideNav from "../../components/SideNav/SideNav";
import LandfillPage from "../LandfillPage/LandfillPage";
import TruckDriverPage from "../TruckDriverPage/TruckDriverPage";
import VehiclePage from "../VehiclePage/VehiclePage";
import OrderPage from "../OrderPage/OrderPage";
import "./HomePage.css";
import RegionSelector from "../../components/RegionSelector";
import { Route, Routes } from "react-router-dom";
import DepotPage from "../DepotPage/DepotPage";
import RoutePage from "../RoutePage/RoutePage";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import Header from "../../components/Header";

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
      initializeDrivers(region);
      initializeLandfills(region);
      initializeOrders(region, date);
      initializeTruckRoutes(region, date);
      initializeVehicles(region);
    }
  }, [region]);

  return (
    <div>
      <Header />
    </div>
  );
};

export default HomePage;
