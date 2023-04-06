import Alert from "../../components/Alert";
import SideNav from "../../components/SideNav/SideNav";
import GoogleMapWithMarkers from "../../components/GoogleMapWithMarkers";
import RegionSelector from "../../components/RegionSelector";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const RoutePage = () => {
  const markers = [
    { lat: 40.7128, lng: -74.006 },
    { lat: 40.73061, lng: -73.935242 },
    { lat: 40.706086, lng: -74.009051 },
  ];

  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <div className="bg-slate-100 flex h-screen">
      <Alert />
      <div className="w-64 bg-slate-50">
        <SideNav />
      </div>
      <div className="mx-auto flex flex-col w-2/3">
        <div className="flex flex-row justify-end">
          <RegionSelector />
        </div>

        <div
          className="mx-auto mt-8"
          style={{ height: "500px", width: "100%" }}
        >
          <GoogleMapWithMarkers
            centerLatitude={40.7128}
            centerLongitude={-74.006}
            markers={markers}
          />
          <div className="mt-6 text-left">
              <label className="ml-2" >Select Date</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date) => handleDateChange(date)}
                className="border-2 rounded w-48 p-2"
              />

          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePage;
