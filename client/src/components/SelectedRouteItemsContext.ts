import { createContext } from "react";

export interface SelectedRouteItemsContextType {
  selectedDepots: Set<string>;
  setSelectedDepots: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedLandfills: Set<string>;
  setSelectedLandfills: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedOrders: Set<string>;
  setSelectedOrders: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const defaultSelectedRouteItemsContext: SelectedRouteItemsContextType = {
  selectedDepots: new Set(),
  setSelectedDepots: () => {},
  selectedLandfills: new Set(),
  setSelectedLandfills: () => {},
  selectedOrders: new Set(),
  setSelectedOrders: () => {},
};

export const SelectedRouteItemsContext = createContext<SelectedRouteItemsContextType>(defaultSelectedRouteItemsContext);
