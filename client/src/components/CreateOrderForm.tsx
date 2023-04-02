import React, { useEffect, useState } from "react";

import { DUMPSTER_SIZES } from "../utils/enums";
import DatePicker from "react-datepicker";
import { LatLng, Address, HttpResponse, Order } from "../types";
import geocode from "../services/geocode";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { NewOrder } from "../types";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";

import "../styles/LoadingBar.css";

interface prop {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  order: Order | undefined;
}

const CreateOrderForm = ({ setActive, order }: prop) => {
  const dispatch = useDispatch();
  const { setAlert, createOrder, updateOrder } = bindActionCreators(
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
  const [dumpster_size, setDumpsterSize] = useState(DUMPSTER_SIZES.TEN);
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [delivery_date, setDeliveryDate] = useState(new Date());
  const [pickup_date, setPickupDate] = useState(new Date());
  const [special_instructions, setInstructions] = useState("");

  useEffect(() => {
    if (order) {
      setName(order.name);
      setStreet(order.street);
      setCity(order.city);
      setState(order.state);
      setZipcode(order.zipcode.toString());
      setLatitude(order.latitude.toString());
      setLongitude(order.longitude.toString());
      setDumpsterSize(order.dumpster_size);
      setEmail(order.email);
      setPhoneNumber(order.phone_number);
      setDeliveryDate(new Date(order.delivery_date));
      setPickupDate(new Date(order.pickup_date));
      setInstructions(order.special_instructions);
    }
  }, [order]);

  const onDumpsterSelect = (dumpster_size: string) => {
    setDumpsterSize(parseInt(dumpster_size));
  };

  const onSubmit = async () => {
    console.log("inside on submit");

    if (
      name === "" ||
      phone_number === "" ||
      email === "" ||
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
      const delivery_date_str = delivery_date.toDateString();
      const pickup_date_str = pickup_date.toDateString();
      const new_order: NewOrder = {
        name,
        street,
        city,
        email,
        phone_number,
        dumpster_size,
        delivery_date: delivery_date_str,
        pickup_date: pickup_date_str,
        state,
        special_instructions,
        zipcode: parseInt(zipcode),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        region_id: region.id,
        type: "Order",
      };
      console.log(new_order);

      setLoading(true);
      const response = (await createOrder(
        new_order
      )) as unknown as HttpResponse;
      setLoading(false);
      if (response.status === "ERROR") {
        setAlert(
          "Order Creation failed. Please try again later.",
          "error",
          3000
        );
      } else {
        setAlert("Order Created", "success", 3000);
        setActive(false);
      }
    }
  };

  const onUpdate = async (order:Order) => {
    console.log("inside on submit");

    if (
      name === "" ||
      phone_number === "" ||
      email === "" ||
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
      const delivery_date_str = delivery_date.toDateString();
      const pickup_date_str = pickup_date.toDateString();
      const updated_order: Order = {
        id: order.id,
        name,
        street,
        city,
        email,
        phone_number,
        dumpster_size,
        delivery_date: delivery_date_str,
        pickup_date: pickup_date_str,
        state,
        special_instructions,
        zipcode: parseInt(zipcode),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        region_id: region.id,
        delivery_completed: order.delivery_completed,
        pickup_completed: order.pickup_completed,
        user_id: order.user_id,
        type: "Order",
      };


      setLoading(true);
      const response = (await updateOrder(
        updated_order
      )) as unknown as HttpResponse;
      setLoading(false);
      if (response.status === "ERROR") {
        setAlert(
          "Order Update failed. Please try again later.",
          "error",
          3000
        );
      } else {
        setAlert("Order Updated", "success", 3000);
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
      <div>
        <div className="h-screen w-screen flex items-center justify-center z-10 fixed top-0 left-0">
          <div className="bg-white px-12 pb-6 rounded-lg shadow-xl z-10 flex flex-col  ">
            <div className={`${loading ? "loading bg-lime-500" : ""}`}></div>
            <h2 className="text-xl font-serif pt-6">Create Order From</h2>
            <ClipboardDocumentIcon className="w-14 h-14 text-lime-500 mx-auto my-5" />
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
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 text-left pl-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700 text-left pl-2"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone-number"
                  id="phone-number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                  placeholder="Phone Number"
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
            <div className="flex flex-row">
              <div className="flex flex-col mr-4 mt-4">
                <label
                  htmlFor="dumpster_size_selector"
                  className="text-left text-sm font-medium text-gray-700 pl-1"
                >
                  Dumpster Size
                </label>
                <select
                  id="dumpster_size_selector"
                  className="mt-2 bg-white p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-32"
                  onChange={({ target }) => onDumpsterSelect(target.value)}
                >
                  <option value={DUMPSTER_SIZES.TEN}>
                    {DUMPSTER_SIZES.TEN}
                  </option>
                  <option value={DUMPSTER_SIZES.FIFTEEN}>
                    {DUMPSTER_SIZES.FIFTEEN}
                  </option>
                  <option value={DUMPSTER_SIZES.TWENTY}>
                    {DUMPSTER_SIZES.TWENTY}
                  </option>
                  <option value={DUMPSTER_SIZES.THIRTY}>
                    {DUMPSTER_SIZES.THIRTY}
                  </option>
                  <option value={DUMPSTER_SIZES.FOURTY}>
                    {DUMPSTER_SIZES.FOURTY}
                  </option>
                  <option value={DUMPSTER_SIZES.FIFTY}>
                    {DUMPSTER_SIZES.FIFTY}
                  </option>

                  {/* {insertDumpsterSizeChoices()} */}
                </select>
              </div>
              <div className="flex flex-col mt-4 mr-4">
                <label
                  htmlFor="delivery_date_picker"
                  className="text-left text-sm font-medium text-gray-700 pl-1"
                >
                  Delivery Date
                </label>
                <DatePicker
                  id="delivery_date_picker"
                  selected={delivery_date}
                  onChange={(date: Date) => setDeliveryDate(date)}
                  className="border rounded w-48 p-1 mt-2"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label
                  htmlFor="pickup_date_picker"
                  className="text-left text-sm font-medium text-gray-700 pl-1"
                >
                  Pickup Date
                </label>
                <DatePicker
                  id="pickup_date_picker"
                  selected={pickup_date}
                  onChange={(date: Date) => setPickupDate(date)}
                  className="border rounded w-48 p-1 mt-2"
                />
              </div>
            </div>
            <textarea
              className="h-32 w-full mt-4 border border-gray-300 focus:outline-none focus:border-indigo-500 focus:border-2 pl-1 pt-1 rounded"
              value={special_instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Special Instructions"
            ></textarea>
            <div className="text-right mt-2">
              <button
                className="mt-5 mr-2 py-2 px-4  text-slate-700 underline underline-offset-1 hover:text-black active:scale-95"
                onClick={() => setActive(false)}
              >
                Cancel
              </button>
              {order ? (              <button
                onClick={()=> onUpdate(order)}
                className="mt-5 py-2 px-4 bg-slate-700 text-white rounded-md drop-shadow hover:bg-stone-900 hover:text-white hover:drop-shadow-md active:drop-shadow-none active:scale-95 active:text-white"
              >
                Update
              </button>):(              <button
                onClick={onSubmit}
                className="mt-5 py-2 px-4 bg-slate-700 text-white rounded-md drop-shadow hover:bg-stone-900 hover:text-white hover:drop-shadow-md active:drop-shadow-none active:scale-95 active:text-white"
              >
                Submit
              </button>)}

            </div>
          </div>

          <div className="fixed inset-0 bg-black opacity-50"></div>
        </div>
      </div>
    </>
  );
};

export default CreateOrderForm;
