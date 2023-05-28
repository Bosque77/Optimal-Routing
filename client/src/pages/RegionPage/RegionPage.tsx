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



  const insertRegionCards = () => {
      return (
        regions.map((region) => {
          return (
            <RegionCard region={region} selectedDate = {selectedDate} />
          )
        })
    );
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
      
        <div className="grid grid-cols-4 mt-8 gap-y-8">
          {insertRegionCards()}
          <AddRegionCard  />
        </div>
      </div>

      {/* {insertRegionCards()} */}
    </div>
  );
};

export default RegionPage;
