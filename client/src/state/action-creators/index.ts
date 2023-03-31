import { ActionType } from "../action-types";
import { Action } from "../actions";
import landfillService from "../../services/landfills";
import loginService from "../../services/login";
import regionService from "../../services/regions";
import driverService from "../../services/driver";
import depotService from "../../services/depots";
import vehicleService from "../../services/vehicle";
import orderService from "../../services/order";
import routeService from "../../services/route";
import { Dispatch } from "redux";
import {
  Depot,
  Driver,
  EditVehicle,
  HttpResponse,
  Landfill,
  LoginInfo,
  NewDepot,
  NewDriver,
  NewLandfill,
  NewOrder,
  NewRegion,
  NewTruckRoute,
  NewVehicle,
  Order,
  Region,
  Route_Item,
  TruckRoute,
  UserToken,
  Vehicle,
} from "../../types";
import { setToken } from "../../services/config";
import { Severity } from "../../types";

export const setRegion = (region: Region) => {
  console.log(JSON.stringify(region));
  window.localStorage.setItem("region", JSON.stringify(region));
  return {
    type: ActionType.SET_REGION,
    data: region,
  };
};

export const initializeRegions = () => {
  return async (dispatch: Dispatch<Action>) => {
    const regions = await regionService.getAll();
    dispatch({
      type: ActionType.INIT_REGIONS,
      data: regions,
    });
  };
};

export const initializeLandfills = (region: Region) => {
  return async (dispatch: Dispatch<Action>) => {
    const landfills = await landfillService.getByRegion(region);
    dispatch({
      type: ActionType.INIT_LANDFILLS,
      data: landfills,
    });
  };
};

export const initializeDrivers = (region: Region) => {
  return async (dispatch: Dispatch<Action>) => {
    const drivers = await driverService.getByRegion(region);
    dispatch({
      type: ActionType.INIT_DRIVERS,
      data: drivers,
    });
  };
};

export const initializeDepots = (region: Region) => {
  return async (dispatch: Dispatch<Action>) => {
    const depots = await depotService.getByRegion(region);
    dispatch({
      type: ActionType.INIT_DEPOTS,
      data: depots,
    });
  };
};

export const initializeVehicles = (region: Region) => {
  return async (dispatch: Dispatch<Action>) => {
    const vehicles = await vehicleService.getByRegion(region);
    dispatch({
      type: ActionType.INIT_VEHICLES,
      data: vehicles,
    });
  };
};

export const initializeOrders = (region: Region, date: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const orders = await orderService.getByRegionAndDate(region, date);
    dispatch({
      type: ActionType.INIT_ORDERS,
      data: orders,
    });
  };
};

export const initializeTruckRoutes = (region: Region, date: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const truck_routes = await routeService.getByRegionAndDate(region, date);
    dispatch({
      type: ActionType.INIT_TRUCK_ROUTES,
      data: truck_routes,
    });
  };
};

export const createLandfill = (landfill: NewLandfill) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await landfillService.createNew(landfill);
    if (response.status === "OK") {
      const new_landfill = response.data as Landfill;
      dispatch({
        type: ActionType.ADD_LANDFILL,
        data: new_landfill,
      });
    }
    return response;
  };
};

export const createDepot = (depot: NewDepot) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await depotService.createNew(depot);
    if (response.status === "OK") {
      const new_depot = response.data as Depot;
      dispatch({
        type: ActionType.ADD_DEPOT,
        data: new_depot,
      });
    }
    return response;
  };
};

export const createDriver = (driver: NewDriver) => {
  return async (dispatch: Dispatch<Action>) => {
    const new_driver = await driverService.createNew(driver);
    dispatch({
      type: ActionType.ADD_DRIVER,
      data: new_driver,
    });
  };
};

export const createVehicle = (vehicle: NewVehicle) => {
  return async (dispatch: Dispatch<Action>) => {
    const new_vehicle = await vehicleService.createNew(vehicle);
    dispatch({
      type: ActionType.ADD_VEHICLE,
      data: new_vehicle,
    });
  };
};

export const createOrder = (order: NewOrder) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await orderService.createNew(order);
    if (response.status === "OK") {
      const new_order = response.data as Order;
      dispatch({
        type: ActionType.ADD_ORDER,
        data: new_order,
      });
      return { status: "OK", data: new_order, message: "Order created" };
    } else {
      return {
        status: "ERROR",
        data: response.data,
        message: response.message,
      };
    }
  };
};

export const createTruckRoute = (input_truck_route: NewTruckRoute) => {
  return async (dispatch: Dispatch<Action>) => {
    const new_truck_route = await routeService.createNew(input_truck_route);
    dispatch({
      type: ActionType.ADD_TRUCK_ROUTE,
      data: new_truck_route,
    });
  };
};

export const createRegion = (region: NewRegion) => {
  return async (dispatch: Dispatch<Action>) => {
    const new_region = await regionService.createNew(region);
    dispatch({
      type: ActionType.ADD_REGION,
      data: new_region,
    });
  };
};

export const updateLandfill = (updated_landfill: Landfill) => {
  return async (dispatch: Dispatch<Action>) => {
    const response = await landfillService.put(updated_landfill);
    if (response.status === "OK") {
      const landfill = response.data as Landfill;
    dispatch({
      type: ActionType.UPDATE_LANDFILL,
      data: landfill,
    });
    return { status: "OK", data: landfill, message: "Order created" };
  }else{
    return {
      status: "ERROR",
      data: response.data,
      message: response.message,
    };
  }
  };
};

export const updateDriver = (updated_driver: Driver) => {
  return async (dispatch: Dispatch<Action>) => {
    const driver = await driverService.put(updated_driver);
    dispatch({
      type: ActionType.UPDATE_DRIVER,
      data: driver,
    });
  };
};

export const updateVehicle = (updated_vehicle: EditVehicle) => {
  return async (dispatch: Dispatch<Action>) => {
    const vehicle = await vehicleService.put(updated_vehicle);
    console.log("returned vehicle");
    console.log(vehicle);
    dispatch({
      type: ActionType.UPDATE_VEHICLE,
      data: vehicle,
    });
  };
};

export const updateDepot = (updated_depot: Depot) => {
  return async (dispatch: Dispatch<Action>) => {
    const depot = await depotService.put(updated_depot);
    dispatch({
      type: ActionType.UPDATE_DEPOT,
      data: depot,
    });
  };
};

export const updateOrder = (updated_order: Order) => {
  return async (dispatch: Dispatch<Action>) => {
    const order = await orderService.put(updated_order);
    dispatch({
      type: ActionType.UPDATE_ORDER,
      data: order,
    });
  };
};

export const updateTruckRoute = (updated_truck_route: TruckRoute) => {
  return async (dispatch: Dispatch<Action>) => {
    const truck_route = await routeService.put(updated_truck_route);
    dispatch({
      type: ActionType.UPDATE_TRUCK_ROUTE,
      data: truck_route,
    });
  };
};

export const deleteLandfill = (landfill: Landfill) => {
  return async (dispatch: Dispatch<Action>) => {
    await landfillService.deleteLandfill(landfill);
    dispatch({
      type: ActionType.DELETE_LANDFILL,
      data: landfill,
    });
  };
};

export const deleteDriver = (driver: Driver) => {
  return async (dispatch: Dispatch<Action>) => {
    await driverService.deleteDriver(driver);
    dispatch({
      type: ActionType.DELETE_DRIVER,
      data: driver,
    });
  };
};

export const deleteVehicle = (vehicle: Vehicle) => {
  return async (dispatch: Dispatch<Action>) => {
    await vehicleService.deleteVehicle(vehicle);
    dispatch({
      type: ActionType.DELETE_VEHICLE,
      data: vehicle,
    });
  };
};

export const deleteDepot = (depot: Depot) => {
  return async (dispatch: Dispatch<Action>) => {
    await depotService.deleteDepot(depot);
    dispatch({
      type: ActionType.DELETE_DEPOT,
      data: depot,
    });
  };
};

export const deleteRegion = (region: Region) => {
  return async (dispatch: Dispatch<Action>) => {
    await regionService.remove(region);
    dispatch({
      type: ActionType.DELETE_REGION,
      data: region,
    });
  };
};

export const deleteOrder = (order: Order) => {
  return async (dispatch: Dispatch<Action>) => {
    await orderService.deleteOrder(order);
    dispatch({
      type: ActionType.DELETE_ORDER,
      data: order,
    });
  };
};

export const deleteTruckRoute = (truck_route: TruckRoute) => {
  return async (dispatch: Dispatch<Action>) => {
    await routeService.deleteOrder(truck_route);
    dispatch({
      type: ActionType.DELETE_TRUCK_ROUTE,
      data: truck_route,
    });
  };
};

export const loginUser = (login_info: LoginInfo) => {
  return async (dispatch: Dispatch<Action>) => {
    const user_data: UserToken = await loginService.login(login_info);
    window.localStorage.setItem("user_token", JSON.stringify(user_data));
    setToken(user_data.token);
    dispatch({
      type: ActionType.SET_USER_TOKEN,
      data: user_data,
    });
  };
};

export const setUserToken = (user_token: UserToken | null) => {
  if (user_token) {
    console.log("setting the token for services to use");
    setToken(user_token.token);
  } else {
    setToken(null);
  }
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_USER_TOKEN,
      data: user_token,
    });
  };
};

export const setAlert = (message: string, severity: Severity, time: number) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SET_ALERT,
      data: { message: message, severity: severity, time: time },
    });
  };
};
