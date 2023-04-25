import Alert from "../../components/Alert";
import SideNav from "../../components/SideNav/SideNav";
import GoogleMapWithMarkers from "../../components/GoogleMapWithMarkers";
import RegionSelector from "../../components/RegionSelector";
import { SelectedRouteItemsContext } from "../../components/SelectedRouteItemsContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, createContext } from "react";
import Dropdown from "../../components/Dropdown";
import {
  initializeDepots,
  initializeOrders,
} from "../../state/action-creators";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../state";
import { bindActionCreators } from "redux";
import { Region } from "../../types";

const RegionPage = () => {
  const dispatch = useDispatch();
  const regions = useSelector((state: State) => state.regions);

  const insertRegionCards = () => {
    return regions.map((region: Region) => {
      return (
        <div className="flex flex-col w-64 h-64 bg-white rounded">
          <h2 className="flex flex-row justify-center w-full">{region.name}</h2>
        </div>
      );
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-100 overflow-y-auto">
      <Alert />
      <div className="w-64 bg-slate-50">
        <SideNav />
      </div>
      <div className="w-2/3 mx-auto grid grid-cols-4">
      <div className="flex flex-col w-64 h-64 bg-white rounded">
        <h2 className="flex flex-row justify-center w-full bg-black">
          {regions[0].name}
        </h2>
      </div>
      <div className="flex flex-col w-64 h-64 bg-white rounded">
        <h2 className="flex flex-row justify-center w-full">
          {regions[1].name}
        </h2>
      </div>
      <div className="flex flex-col w-64 h-64 bg-white rounded">
        <h2 className="flex flex-row justify-center w-full">
          {regions[1].name}
        </h2>
      </div>
      <div className="flex flex-col w-64 h-64 bg-white rounded">
        <h2 className="flex flex-row justify-center w-full">
          {regions[1].name}
        </h2>
      </div>
      <div className="flex flex-col w-64 h-64 bg-white rounded">
        <h2 className="flex flex-row justify-center w-full">
          {regions[1].name}
        </h2>
      </div>
      </div>

      {/* {insertRegionCards()} */}
    </div>
  );
};

export default RegionPage;
