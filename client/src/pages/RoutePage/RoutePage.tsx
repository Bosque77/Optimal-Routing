import Alert from "../../components/Alert";
import SideNav from "../../components/SideNav/SideNav";
import GoogleMapWithMarkers from "../../components/GoogleMapWithMarkers";
import RegionSelector from "../../components/RegionSelector";
import { SelectedRouteItemsContext } from "../../components/SelectedRouteItemsContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, createContext } from "react";
import Dropdown from "../../components/Dropdown";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../state";
import { bindActionCreators } from "redux";
import { Region, TruckRoute } from "../../../../shared/types";
import RouteListUpdated from "../../components/RouteListUpdated";

const RoutePage = () => {
  const dispatch = useDispatch();
  const region = useSelector((state: State) => state.setRegion) as Region;
  const orders = useSelector((state: State) => state.orders);
  const landfills = useSelector((state: State) => state.landfills);
  const depots = useSelector((state: State) => state.depots);
  const routes = useSelector((state: State) => state.routes);

  const [currentRoutes, setCurrentRoutes] = useState<TruckRoute[]>(routes);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedDepots, setSelectedDepots] = useState<Set<string>>(new Set());
  const [selectedLandfills, setSelectedLandfills] = useState<Set<string>>(
    new Set()
  );
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const {
    initializeOrders,
    initializeLandfills,
    initializeDepots,
    initializeTruckRoutes,
  } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (region) {
      initializeOrders(region, selectedDate.toDateString());
      initializeLandfills(region);
      initializeDepots(region);
      initializeDepots(region);
      initializeTruckRoutes(region, selectedDate.toDateString());
    }
  }, [region, selectedDate]);


  const getOrdersInRoutes = (routes: TruckRoute[]) => {
    const ordersInRoutes = new Set<string>();
    routes.forEach((route) => {
      route.route_items.forEach((item, index) => {
        if (route.route_types[index] === "Order") {
          ordersInRoutes.add(item);
        }
      });
    });
    return ordersInRoutes;
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
        <SelectedRouteItemsContext.Provider
          value={{
            selectedDepots,
            setSelectedDepots,
            selectedLandfills,
            setSelectedLandfills,
            selectedOrders,
            setSelectedOrders,
            currentRoutes,
            setCurrentRoutes,
          }}
        >
          <div
            className="mx-auto mt-8"
            style={{ height: "500px", width: "100%" }}
          >
            <GoogleMapWithMarkers
              centerLatitude={region.latitude}
              centerLongitude={region.longitude}
            />
          </div>
          <div className="flex flex-row w-full my-12">
            <div className="text-left">
              <label className="ml-2">Select Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date) => handleDateChange(date)}
                className="border-2 rounded w-48 p-2"
                popperPlacement="bottom-start"
              />
              <div className="flex flex-row justify-between mt-8">
                <Dropdown selected_date={selectedDate} ordersInRoutes={getOrdersInRoutes(currentRoutes)} />
              </div>
            </div>

            <div className="flex flex-col bg-white w-full rounded mx-6 shadow">
              <div className=" py-4 ">
                <div className="w-full text-right px-2 py-2">
                  <button className="py-2 px-4 bg-gray-100 rounded shadow hover:text-white hover:bg-slate-700 active:scale-95 text-right">
                    Custom Route
                  </button>
                </div>
                {currentRoutes.length > 0 ? (
                  <div className="px-4">
                    <RouteListUpdated truck_routes={currentRoutes} />
                  </div>
                ) : (
                  <>
                    <p className="text-lg px-4 mt-6 rounded text-slate-500 w-1/2 mx-auto">
                      There are not any routes to display yet. Create a custom
                      route or use the auto route generator.
                    </p>
                    <img
                      className=" mx-auto w-1/2"
                      src="/images/Routes_Place_Holder_Image_1_v3.png"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </SelectedRouteItemsContext.Provider>
      </div>
    </div>
  );
};

export default RoutePage;
