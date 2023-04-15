import { createContext } from "react";

export interface DropdownTableContextType {
  selectedDepots: Set<string>;
  setSelectedDepots: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedLandfills: Set<string>;
  setSelectedLandfills: React.Dispatch<React.SetStateAction<Set<string>>>;
  selectedOrders: Set<string>;
  setSelectedOrders: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const defaultDropdownTableContext: DropdownTableContextType = {
  selectedDepots: new Set(),
  setSelectedDepots: () => {},
  selectedLandfills: new Set(),
  setSelectedLandfills: () => {},
  selectedOrders: new Set(),
  setSelectedOrders: () => {},
};

export const DropdownTableContext = createContext<DropdownTableContextType>(defaultDropdownTableContext);
