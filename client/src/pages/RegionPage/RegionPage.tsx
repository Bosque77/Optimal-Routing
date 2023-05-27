import Alert from "../../components/Alert";
import SideNav from "../../components/SideNav/SideNav";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState, createContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../state";
import { bindActionCreators } from "redux";
import { Region } from "../../../../shared/types";
import RegionCard from "./RegionCard";
import AddRegionCard from "./AddRegionCard";

const RegionPage = () => {
  const dispatch = useDispatch();
  const regions = useSelector((state: State) => state.regions);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const regionsData = [
    { name: "Atlanta", landfills: 10, depots: 5, dailyOrders: 200 },
    { name: "Seattle", landfills: 8, depots: 4, dailyOrders: 150 },
    // Add more regions here
  ];

  const handleAddRegionClick = () => {
    // handle adding a new region here
  };

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
      <div className="flex flex-col mx-auto w-2/3 ">
        <div className="text-end p-4 justify-end">
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            className="border rounded-md p-2 text-center w-48"
            popperPlacement="bottom-end"
          />
        </div>
      
        <div className="grid grid-cols-4 mt-8">
          {regionsData.map((region) => (
            <RegionCard key={region.name} region={region} />
          ))}
          <AddRegionCard onSave={handleAddRegionClick} />
        </div>
      </div>

      {/* {insertRegionCards()} */}
    </div>
  );
};

export default RegionPage;
