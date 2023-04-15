import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { HttpResponse, NewRegion } from "../types";

interface Props {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateRegionForm = ({ setActive }: Props) => {
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const { setAlert, createRegion } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const alert_data = useSelector((state: State) => state.alert_data);
  const [name, setName] = useState("");

  const submit = async () => {
    if (name === "") {
      setAlert(
        "Please fill out all required fields",
        "error",
        3000,
        alert_data.id + 1
      );
    } else {
      const newRegion: NewRegion = { name, 
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
       };
      const response = (await createRegion(
        newRegion
      )) as unknown as HttpResponse;
      if (response.status === "ERROR") {
        setAlert(
          "Region Creation failed. Please try again later.",
          "error",
          3000,
          alert_data.id + 1
        );
      } else {
        setAlert("Region Created", "success", 3000, alert_data.id + 1);
        setActive(false);
      }
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center z-10 fixed top-0 left-0">
        <div className="bg-white px-12 pb-6 rounded-lg shadow-xl absolute z-50 flex flex-col relative overflow-hidden">
          <h2 className="text-xl font-serif pt-6">Create Region Form</h2>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 text-left pl-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
              placeholder="Name"
            />
            <div className="flex flex-row">
              <div>
              <label
                htmlFor="Latitude"
                className="block text-sm font-medium text-gray-700 text-left pl-2"
              >
                Latitude
              </label>
              <input
                type="number"
                name="Latitude"
                id="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className=" border rounded-md border-gray-300 pl-2 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-32"
                placeholder="Latitude"
              />
              </div>
              <div>
              <label
                htmlFor="Longitude"
                className="block text-sm font-medium text-gray-700 text-left pl-2"
              >
                Longitude
              </label>
              <input
                type="number"
                name="Longitude"
                id="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className=" border rounded-md border-gray-300 pl-2 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-32"
                placeholder="Latitude"
              />
              </div>


            </div>
          </div>
          <div className="text-right mt-2">
            <button
              className="mt-5 mr-2 py-2 px-4  text-slate-700 underline underline-offset-1 hover:text-black active:scale-95"
              onClick={() => setActive(false)}
            >
              Cancel
            </button>
            <button
              onClick={submit}
              className="mt-5 py-2 px-4 bg-slate-700 text-white rounded-md drop-shadow hover:bg-stone-900 hover:text-white hover:drop-shadow-md active:drop-shadow-none active:scale-95 active:text-white"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="fixed inset-0 bg-black opacity-50"></div>
      </div>
    </>
  );
};

export default CreateRegionForm;
