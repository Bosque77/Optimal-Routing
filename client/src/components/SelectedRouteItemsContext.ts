import { createContext } from "react";
import { TruckRoute } from "../../../shared/types";

export interface SelectedRouteItemsContextType {
  selectedDepots: Set<string>;
  setSelectedDepots: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedLandfills: Set<string>;
  setSelectedLandfills: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedOrders: Set<string>;
  setSelectedOrders: React.Dispatch<React.SetStateAction<Set<string>>>;
  currentRoutes: TruckRoute[],
  setCurrentRoutes: React.Dispatch<React.SetStateAction<TruckRoute[]>>,
  selectedDate: Date,
}

const defaultSelectedRouteItemsContext: SelectedRouteItemsContextType = {
  selectedDepots: new Set(),
  setSelectedDepots: () => {},
  selectedLandfills: new Set(),
  setSelectedLandfills: () => {},
  selectedOrders: new Set(),
  setSelectedOrders: () => {},
  currentRoutes: [] as TruckRoute[],
  setCurrentRoutes: () => {},
  selectedDate: new Date(),
};

export const SelectedRouteItemsContext = createContext<SelectedRouteItemsContextType>(defaultSelectedRouteItemsContext);
