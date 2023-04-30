import { useSelector } from "react-redux";
import { TruckRoute } from "../../../shared/types";
import React from 'react';
import { State } from "../state";

interface prop {
    truck_routes: TruckRoute[];
}

const RouteListUpdated = ({truck_routes}: prop) => {
    let my_key = 0;

  const orders = useSelector((state: State) => state.orders);
  const depots = useSelector((state: State) => state.depots);
  const landfills = useSelector((state: State) => state.landfills);


  const insertRows = (truck_route: TruckRoute) => {
    const rows = [];
    const num_of_items = truck_route.route_items.length;
    for (let i = 0; i < num_of_items; i++) {
      const route_type = truck_route.route_types[i];
      const item_key = truck_route.route_items[i];
      const distance = truck_route.distances[i];
      const duration = truck_route.durations[i];

      let route_item;

      if(route_type == "Depot"){
        route_item = depots.find((depot) => depot.id === item_key); 
      }else if(route_type == "Landfill"){
        route_item = landfills.find((landfill) => landfill.id === item_key);
      }else{
        route_item = orders.find((order) => order.id === item_key);
      }

      console.log(route_item)


      rows.push(
        <tr key={my_key+1}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{route_type}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">{route_item?.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
            {route_item?.street} {route_item?.city}, {route_item?.state} {route_item?.zipcode}
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
    
    return truck_routes.map((truck_route) => (
        my_key += 1,
      <table key={my_key} className="min-w-full mt-2 bg-white border border-gray-200 divide-y divide-gray-100 ">
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
          {insertRows(truck_route)}
        </tbody>
      </table>
    ));
  };

  return <div>{insertTruckRoutes()}</div>;
};

export default RouteListUpdated;
