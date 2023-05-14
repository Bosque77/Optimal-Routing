import { useDispatch, useSelector } from "react-redux";
import { HttpResponse, Order, TruckRoute, Route_Item  } from "../../../shared/types";
import React, { useContext, useState} from "react";
import { State, actionCreators } from "../state";
import { TrashIcon } from "@heroicons/react/24/outline";
import {MinusCircleIcon} from "@heroicons/react/24/outline";

import {
  SelectedRouteItemsContext,
  SelectedRouteItemsContextType,
} from "./SelectedRouteItemsContext";
import { bindActionCreators } from "redux";
import ConfirmDelete from "./ConfirmDelete";
import RouteItemSelector from "../components/RouteItemSelector";
import RouteQueryService from "../services/route_query";

interface prop {
  ordersInRoutes: Set<string>;
}

const RouteListUpdated = ({ ordersInRoutes }: prop) => {
  const dispatch = useDispatch();
  const [visibleTables, setVisibleTables] = useState<number[]>([]);
  const [confirmDeleteActive, setConfirmDeleteActive] =
    useState<boolean>(false);

  const alert_data = useSelector((state: State) => state.alert_data);
  const orders = useSelector((state: State) => state.orders);
  const depots = useSelector((state: State) => state.depots);
  const landfills = useSelector((state: State) => state.landfills);
  const [showRouteItemSelector, setShowRouteItemSelector] = useState(false);
  const [current_truck_route, setCurrentTruckRoute] = useState<
    TruckRoute | undefined
  >(undefined);
  const [current_truck_route_index, setCurrentTruckRouteIndex] = useState(0);

  const [current_item_ref_number, setCurrentItemRefNumber] = useState<
    number | undefined
  >(undefined);

  const { deleteTruckRoute, createTruckRoute, updateTruckRoute, setAlert } =
    bindActionCreators(actionCreators, dispatch);

  const { currentRoutes, setCurrentRoutes, selectedDate } =
    useContext<SelectedRouteItemsContextType>(SelectedRouteItemsContext);

  if (!currentRoutes) {
    return <div></div>;
  }

  const onInsertRouteItem = (
    route_item_ref_number: number,
    truck_route: TruckRoute,
    index: number,
  ) => {
    setCurrentTruckRoute(truck_route);
    setCurrentItemRefNumber(route_item_ref_number);
    setShowRouteItemSelector(true);
    setCurrentTruckRouteIndex(index);
  };

  const saveRoute = async (truck_route: TruckRoute, truck_route_index: number) => {
    if (truck_route.id) {
      updateRoute(truck_route);
    } else {
      const response = (await createTruckRoute(
        truck_route
      )) as unknown as HttpResponse;
      if (response.status === "ERROR") {
        setAlert(
          "Route Creation failed. Please try again later.",
          "error",
          3000,
          alert_data.id + 1
        );
      } else {
        setAlert("Route Created", "success", 3000, alert_data.id + 1);
      }
    }
  };

  const updateRoute = async (truck_route: TruckRoute) => {
    const response = (await updateTruckRoute(
      truck_route
    )) as unknown as HttpResponse;
    if (response.status === "ERROR") {
      setAlert(
        "Route Update failed. Please try again later.",
        "error",
        3000,
        alert_data.id + 1
      );
    } else {
      setAlert("Route Updated Succesfully", "success", 3000, alert_data.id + 1);
    }
  };

  const reCalculateRoute = async (truck_route: TruckRoute, truck_route_index: number) => {
    const route_item_ids = truck_route.route_items;
    const route_items = route_item_ids.map((id, index) => {
      const route_type = truck_route.route_types[index];
      if (route_type == "Depot") {
        return depots.find((depot) => depot.id === id);
      } else if (route_type == "Landfill") {
        return landfills.find((landfill) => landfill.id === id);
      } else {
        return orders.find((order) => order.id === id);
      }
    }) as Route_Item[];

    const response = await RouteQueryService.analyzeRoute(route_items);
    if (response.status === "OK") {
      const route_data = response.data as unknown as any;
      setAlert("Route Analysis successful", "success", 3000, alert_data.id + 1);
      truck_route.distances = route_data.distances;
      truck_route.durations = route_data.durations;
      truck_route.total_distance = route_data.total_distance;
      truck_route.total_duration = route_data.total_duration;

      // Format distances in the truck_route object
      truck_route.distances = truck_route.distances.map((distance) =>
        parseFloat(distance.toFixed(2))
      );

      // Format durations in the truck_route object
      truck_route.durations = truck_route.durations.map((duration) =>
        parseFloat(duration.toFixed(2))
      );

      // Format total distance in the truck_route object
      truck_route.total_distance = parseFloat(
        truck_route.total_distance.toFixed(2)
      );

      // Format total duration in the truck_route object
      truck_route.total_duration = parseFloat(
        truck_route.total_duration.toFixed(2)
      );

      const new_current_routes = currentRoutes.map((route, current_index) => {
        if (current_index === truck_route_index) {
          return truck_route;
        }
        return route;
      });
      setCurrentRoutes(new_current_routes);
    } else {
      setAlert(
        "Route Analysis failed. Please try again later.",
        "error",
        3000,
        alert_data.id + 1
      );
    }
  };

  const toggleTableVisibility = (index: number) => {
    setVisibleTables((prevVisibleTables) =>
      prevVisibleTables.includes(index)
        ? prevVisibleTables.filter((tableIndex) => tableIndex !== index)
        : [...prevVisibleTables, index]
    );
  };

  const deleteRoute = async (index: number) => {
    console.log("inside delete route");
    let current_route = currentRoutes[index];
    if (current_route.id) {
      const response = (await deleteTruckRoute(
        current_route
      )) as unknown as HttpResponse;
      if (response.status === "ERROR") {
        setAlert(
          "Route Deletion failed. Please try again later.",
          "error",
          3000,
          alert_data.id + 1
        );
      } else {
        setAlert("Route Deleted", "success", 3000, alert_data.id + 1);
      }
    } else {
      let updated_routes = currentRoutes.filter((route, i) => i !== index);
      setCurrentRoutes(updated_routes);
    }
  };

  const insertRows = (truck_route: TruckRoute, index: number) => {
    const rows = [];
    const num_of_items = truck_route.route_items.length;
    for (let i = 0; i < num_of_items; i++) {
      const item_ref_number = i + 1;
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
            <div className="text-sm text-gray-900">{distance}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{duration}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button
              onClick={() => onDeleteRouteItem(item_ref_number, truck_route, index)}
              className=""
            >
              <MinusCircleIcon className="h-5 w-5 hover:text-black hover:scale-110 text-gray-900 active:scale-95" aria-hidden="true" />
            </button>
          </td>
          <td className="relative right-[-2rem] px-2 py-4 whitespace-nowrap">
            <div className="absolute bottom-0 left-[1rem] mb-[-1.25rem] px-2 py-2 hover:bg-gray-200 hover:text-black rounded active:scale-75 cursor-pointer">
              <span
                onClick={() => onInsertRouteItem(item_ref_number, truck_route, index)}
                className="bg-none text-black cursor-pointer"
              >
                {"<"}
              </span>
            </div>
          </td>
        </tr>
      );
    }
    return rows;
  };

  const insertTruckRoutes = () => {
    return currentRoutes.map((current_route, truck_route_index) => {
      const totalDurationHours = Math.floor(current_route.total_duration / 60);
      const totalDurationMinutes = Math.floor(
        current_route.total_duration % 60
      );

      return (
        <div key={`${Date.now()}-${Math.random()}`} className="mt-4">
          <div
            onClick={() => toggleTableVisibility(truck_route_index)}
            className={
              current_route.total_distance > 0
                ? "flex items-center justify-between p-4 text-lg bg-gray-100 text-gray-800 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-900 focus:outline-none"
                : "flex items-center justify-between p-4 text-lg bg-gray-100 text-gray-800 border border-red-300 rounded-md cursor-pointer hover:bg-gray-200 hover:text-gray-900 focus:outline-none"
            }
          >
            <div className="flex flex-row w-full">
              <div className="flex flex-grow justify-start">
                Route: {truck_route_index + 1}
              </div>
              {current_route.total_distance > 0 && (
                <div className="inline-block px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded-full">
                  Total Distance: {current_route.total_distance} miles | Total
                  Duration:{" "}
                  {totalDurationHours > 0 && (
                    <span>
                      {totalDurationHours} hour
                      {totalDurationHours > 1 ? "s" : ""}{" "}
                    </span>
                  )}
                  {totalDurationMinutes > 0 && (
                    <span>
                      {totalDurationMinutes} minute
                      {totalDurationMinutes > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              )}
              {current_route.total_distance == 0 && (
                <div className="text-black">
                  The distances and durations need to be re-calculated
                </div>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteRoute(truck_route_index);
              }}
              className="text-gray-700 hover:text-black hover:bg-gray-200 focus:outline-none rounded-md active:scale-95"
            >
              <TrashIcon className="w-6 h-6 ml-6" />
            </button>
          </div>
          {visibleTables.includes(truck_route_index) && (
            <div className="">
              <table className="min-w-full  mt-2 bg-white border border-gray-200 divide-y divide-gray-100 ">
                <thead
                  className={
                    current_route.total_distance === 0
                      ? "bg-gray-100"
                      : "bg-gray-100"
                  }
                >
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Distance
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Duration
                    </th>
                    <th className="w-10"></th>{" "}
                    <th className="w-10"></th>{" "}
                    {/* New column for arrow symbol */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {insertRows(current_route, truck_route_index)}
                </tbody>
              </table>

              <div className="flex w-full justify-end ">
                {current_route.total_distance == 0 ? (
                  <button
                    onClick={() => reCalculateRoute(current_route, truck_route_index)}
                    className="mr-4 mt-2 px-4 py-2 rounded bg-gray-100 shadow hover:text-white hover:bg-slate-700 active:scale-95"
                  >
                    Recalculate
                  </button>
                ) : (
                  <button
                    onClick={() => saveRoute(current_route, truck_route_index)}
                    className="mr-4 mt-2 px-4 py-2 rounded bg-gray-100 shadow hover:text-white hover:bg-slate-700 active:scale-95"
                  >
                    Save Route
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const onDeleteRouteItem = (item_ref_number: number, truck_route: TruckRoute, index: number) => {
    console.log('about to delete the route item')
    console.log(truck_route)
    const updated_truck_route = {...truck_route}
    updated_truck_route.route_items.splice(item_ref_number,1)
    updated_truck_route.route_types.splice(item_ref_number,1)
    updated_truck_route.distances = []
    updated_truck_route.durations = []
    updated_truck_route.total_distance = 0
    updated_truck_route.total_duration = 0
    setCurrentRoutes(currentRoutes.map((route, current_index) => current_index === index ? updated_truck_route : route))

    console.log('pause here');
  };


  return (
    <div>
      {insertTruckRoutes()}
      {confirmDeleteActive && (
        <ConfirmDelete setActive={setConfirmDeleteActive} />
      )}
      {showRouteItemSelector && (
        <RouteItemSelector
          truck_route={current_truck_route}
          item_ref_number={current_item_ref_number}
          setShowRouteItemSelector={setShowRouteItemSelector}
          ordersInRoutes={ordersInRoutes}
          truck_route_index={current_truck_route_index}
        />
      )}
    </div>
  );
};

export default RouteListUpdated;
