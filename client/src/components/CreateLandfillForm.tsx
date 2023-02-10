import React, { useState } from "react";
import { LatLng, Address, HttpResponse, NewLandfill } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import geocode from "../services/geocode";
import { TrashIcon } from "@heroicons/react/24/solid";


interface prop {
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateLandfillForm = ({ setActive }: prop) => {

    const dispatch = useDispatch();
    const { setAlert, createLandfill } = bindActionCreators(
        actionCreators,
        dispatch
    );

    const region = useSelector((state: State) => state.setRegion);


    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");



    const submit = async () => {
        console.log("inside on submit");
    
        if (
          name === "" ||
          street === "" ||
          city === "" ||
          state === "" ||
          zipcode === "" ||
          latitude === "" ||
          longitude === "" ||
          region === null
        ) {
          setAlert("Please fill out all required fields", "error", 3000);
        } else {

          const new_landfill: NewLandfill = {
            name,
            street,
            city,
            state,
            zipcode: parseInt(zipcode),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            region_id: region.id,
            type: "Landfill",
          };
    
          setLoading(true);
          const response = await createLandfill(new_landfill) as unknown as HttpResponse;
          setLoading(false);
          if( response.status === "ERROR"){
            setAlert("Landfill Creation failed. Please try again later.", "error", 3000);
          }else{
            setAlert("Order Created", "success", 3000);
            setActive(false);
          }
    
        }
      };




    const geoLocate = async () => {
        const address: Address = {
            street,
            city,
            state,
            zipcode: parseInt(zipcode),
        };
        const response = await geocode.get(address);
        console.log(response);
        if (response.status === "ERROR") {
            const message =
                "Could not find address.  Please try again or manually enter coordinates";
            const severity = "error";
            setAlert(message, severity, 3000);
        } else {
            const lat_lng = response.data as LatLng;
            setLatitude(lat_lng.lat.toFixed(3));
            setLongitude(lat_lng.lng.toFixed(3));
        }
    };



    return (
        <>
            <div className="h-screen w-screen flex items-center justify-center z-20 fixed top-0 left-0">
            <div className="bg-white px-12 pb-6 rounded-lg shadow-xl z-10 flex flex-col  overflow-hidden ">
                    <div className={`${loading ? "loading bg-lime-500" : ""}`}></div>

                    <h2 className="text-xl font-serif pt-6">Create Landfill From</h2>
                    <div className="flex flex-row justify-center py-6">
                        <TrashIcon className="w-12 h-12 text-black" />
                    </div>
                    <div className="grid gap-4 grid-cols-2">
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
                                className=" border rounded-md pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
                                placeholder="Name"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="street"
                                className="block text-sm font-medium text-gray-700 text-left pl-2"
                            >
                                Street
                            </label>
                            <input
                                type="text"
                                name="street"
                                id="street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                                placeholder="Street"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700 text-left pl-2"
                            >
                                City
                            </label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                                placeholder="City"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor="state"
                                className="block text-sm font-medium text-gray-700 text-left pl-2"
                            >
                                State
                            </label>
                            <input
                                type="text"
                                name="state"
                                id="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                                placeholder="State"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="zipcode"
                                className="block text-sm font-medium text-gray-700 text-left pl-2"
                            >
                                Zipcode
                            </label>
                            <input
                                type="text"
                                name="zipcode"
                                id="zipcode"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                                placeholder="Zipcode"
                            />
                        </div>
                        <div></div>
                        <div className="flex flex-row">
                            <div className="flex flex-col mr-3">
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
                            <div className="flex flex-col">
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
                                    placeholder="Longitude"
                                />
                            </div>
                        </div>
                        <div className="text-left mt-2">
                            <button
                                className="mt-5 py-2 px-4 bg-slate-50 text-black rounded-md drop-shadow hover:bg-stone-900 hover:text-white hover:drop-shadow-md active:drop-shadow-none active:scale-95 active:text-white"
                                onClick={geoLocate}
                            >
                                Calculate
                            </button>
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


export default CreateLandfillForm;