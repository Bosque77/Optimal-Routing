import Alert from "../../components/Alert";
import SideNav from "../../components/SideNav/SideNav";
import GoogleMapWithMarkers from "../../components/GoogleMapWithMarkers";
import RegionSelector from "../../components/RegionSelector";
import { DropdownTableContext } from "../../components/DropdownTableContext";

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

const RoutePage = () => {
  const markers = [
    { lat: 40.7128, lng: -74.006 },
    { lat: 40.73061, lng: -73.935242 },
    { lat: 40.706086, lng: -74.009051 },
  ];

  const dispatch = useDispatch();
  const region = useSelector((state: State) => state.setRegion);
  const orders = useSelector((state: State) => state.orders);
  const landfills = useSelector((state: State) => state.landfills); 
  const depots = useSelector((state: State) => state.depots);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDepots, setSelectedDepots] = useState<Set<string>>(new Set());
  const [selectedLandfills, setSelectedLandfills] = useState<Set<string>>(
    new Set()
  );
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const { initializeOrders, initializeLandfills, initializeDepots } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (region) {
      initializeOrders(region, selectedDate.toDateString());
      initializeLandfills(region);
      initializeDepots(region);
    }
  }, [region, selectedDate]);



  // write the getMarkers function that returns markers based on the selected orders, landfills and depots 
  const getMarkers = () => {
    let markers: any = [];
    if (selectedOrders.size > 0) {
      for (let order_id of selectedOrders) {
        const order = orders.find((order) => order.id === order_id);
        if (order) {
          markers.push({ lat: order.latitude, lng: order.longitude, type: "order" });
        }
      }
    }
    if (selectedLandfills.size > 0) {
      for (let landfill of selectedLandfills) {
        markers.push({
          lat: landfills[landfill].latitude,
          lng: landfills[landfill].longitude,
        });
      }
    }
    if (selectedDepots.size > 0) {
      for (let depot of selectedDepots) {
        markers.push({
          lat: depots[depot].latitude,
          lng: depots[depot].longitude,
        });
      }
    }
    return markers;
  }
  

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
        <div>
          {/* write a table for orders here  */}
          <table></table>
        </div>

        <div
          className="mx-auto mt-8"
          style={{ height: "500px", width: "100%" }}
        >
          <GoogleMapWithMarkers
            centerLatitude={40.7128}
            centerLongitude={-74.006}
            markers={getMarkers}
          />
        </div>
        <div className="my-6 text-left">
          <label className="ml-2">Select Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => handleDateChange(date)}
            className="border-2 rounded w-48 p-2"
            popperPlacement="bottom-start"
          />
          <div className="my-8">
            <DropdownTableContext.Provider
              value={{
                selectedDepots,
                setSelectedDepots,
                selectedLandfills,
                setSelectedLandfills,
                selectedOrders,
                setSelectedOrders,
              }}
            >
              <Dropdown selected_date={selectedDate} />
            </DropdownTableContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePage;
