import { useDispatch, useSelector } from "react-redux";
import { HttpResponse, Order, TruckRoute } from "../../../shared/types";
import React, { useContext, useState } from "react";
import { State, actionCreators } from "../state";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  SelectedRouteItemsContext,
  SelectedRouteItemsContextType,
} from "./SelectedRouteItemsContext";
import { bindActionCreators } from "redux";
import ConfirmDelete from "./ConfirmDelete";

const RouteListUpdated = () => {
  const dispatch = useDispatch();
  const [visibleTables, setVisibleTables] = useState<number[]>([]);
  const [confirmDeleteActive, setConfirmDeleteActive] =
    useState<boolean>(false);

  const alert_data = useSelector((state: State) => state.alert_data);
  const orders = useSelector((state: State) => state.orders);
  const depots = useSelector((state: State) => state.depots);
  const landfills = useSelector((state: State) => state.landfills);

  const { deleteTruckRoute, createTruckRoute, updateTruckRoute, setAlert } =
    bindActionCreators(actionCreators, dispatch);

  const { currentRoutes, setCurrentRoutes, selectedDate } =
    useContext<SelectedRouteItemsContextType>(SelectedRouteItemsContext);

    if(!currentRoutes){
      return <div></div>
    }

  const saveRoute = async (truck_route:TruckRoute) => {
    const response = await createTruckRoute(truck_route) as unknown as HttpResponse;
      if (response.status === "ERROR") {
        setAlert(
          "Route Creation failed. Please try again later.",
          "error",
          3000,
          alert_data.id+1
        );
      } else {
        setAlert("Route Created", "success", 3000, alert_data.id+1);
      }

  };

  const updateRoute = (truck_route:TruckRoute) => {
    updateTruckRoute(truck_route);
  };

  const toggleTableVisibility = (index: number) => {
    setVisibleTables((prevVisibleTables) =>
      prevVisibleTables.includes(index)
        ? prevVisibleTables.filter((tableIndex) => tableIndex !== index)
        : [...prevVisibleTables, index]
    );
  };

  const deleteRoute = (index: number) => {
    console.log("inside delete route");
    let current_route = currentRoutes[index];
    if (current_route.id) {
      deleteTruckRoute(current_route);
    } else {
      let updated_routes = currentRoutes.filter((route, i) => i !== index);
      setCurrentRoutes(updated_routes);
    }
  };

  const insertRows = (truck_route: TruckRoute) => {
    const rows = [];
    const num_of_items = truck_route.route_items.length;
    for (let i = 0; i < num_of_items; i++) {
      let route_type = truck_route.route_types[i];
      const item_key = truck_route.route_items[i];
      const distance = truck_route.distances[i];
      const duration = truck_route.durations[i];

      let route_item;

      if (route_type == "Depot") {
        route_item = depots.find((depot) => depot.id === item_key);
      } else if (route_type == "Landfill") {
        route_item = landfills.find((landfill) => landfill.id === item_key);
      } else {
        route_item = orders.find((order) => order.id === item_key) as Order;
        if ((route_item.delivery_date = selectedDate.toDateString())) {
          route_type = route_item.dumpster_size + " Yard" + " Delivery";
        } else {
          route_type = route_item.dumpster_size + " Yard" + " Pickup";
        }
      }

      rows.push(
        <tr key={`${Date.now()}-${Math.random()}`}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{route_type}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{route_item?.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {route_item?.street} {route_item?.city}, {route_item?.state}{" "}
              {route_item?.zipcode}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{distance}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{duration}</div>
          </td>
        </tr>
      );
    }
    return rows;
  };

  const insertTruckRoutes = () => {
    return currentRoutes.map((current_route, index) => (
      <div key={`${Date.now()}-${Math.random()}`} className="mt-4">
        <div
          onClick={() => toggleTableVisibility(index)}
          className="flex items-center justify-between p-4 text-lg bg-gray-100 text-gray-800 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-900 focus:outline-none"
        >
          <div className="flex flex-row w-full">
            <div className="flex flex-grow justify-start">
              Route: {index + 1}
            </div>
            <div className="">
              Total Distance: {current_route.total_distance} | Total Duration:
              {current_route.total_duration}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteRoute(index);
            }}
            className="p-2 text-gray-700 hover:text-black hover:bg-gray-200 focus:outline-none rounded-md active:scale-95"
          >
            <TrashIcon className="w-6 h-6 ml-6" />
          </button>
        </div>
        {visibleTables.includes(index) && (
          <div>
            <table className="min-w-full mt-2 bg-white border border-gray-200 divide-y divide-gray-100 ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Address
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Distance
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {insertRows(current_route)}
              </tbody>
            </table>

            <div className="flex w-full justify-end ">
              {current_route.id ? (
                <button className="mr-4 mt-2 px-4 py-2 rounded bg-gray-100 shadow hover:text-white hover:bg-slate-700 active:scale-95">
                  Update Route
                </button>
              ) : (
                <button onClick={() => saveRoute(current_route)} className="mr-4 mt-2 px-4 py-2 rounded bg-gray-100 shadow hover:text-white hover:bg-slate-700 active:scale-95">
                  Save Route
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    ));
  };



  return (
    <div>
      {insertTruckRoutes()}
      {confirmDeleteActive && (
        <ConfirmDelete setActive={setConfirmDeleteActive} />
      )}
    </div>
  );
};

export default RouteListUpdated;
