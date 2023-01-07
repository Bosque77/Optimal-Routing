import React, { useState } from "react";
import { TruckIcon } from "@heroicons/react/24/solid";
import { DUMPSTER_SIZES } from "../utils/enums"

interface prop {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateOrderFrom = ({ setActive }: prop) => {




  return (
    <>
      <div className="fixed h-screen w-screen flex items-center justify-center">
        <div className="bg-white px-4 py-6 rounded-lg shadow-xl absolute z-50 flex flex-col">
          <h2 className="text-xl font-serif">Create Order From</h2>
          <TruckIcon className="w-14 h-14 text-lime-500 mx-auto my-5" />
          <div className="flex flex-row">
            <div className="flex flex-col mr-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 text-left pl-2"
              >
                First Name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                className=" border rounded-md pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left"
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 text-left pl-2"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left "
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <div className="flex flex-col mr-3">
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
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <div className="flex flex-col mr-3">
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
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                placeholder="City"
              />
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <div className="flex flex-col mr-3">
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
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                placeholder="Zipcode"
              />
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <button className="mr-3">Calculate</button>
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
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-40"
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
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left w-40"
                placeholder="Longitude"
              />
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <div className="flex flex-col mr-3">
              <label htmlFor="dumpster_size_selector" className="text-left text-sm font-medium text-gray-700 pl-1">
                Dumpster Size
              </label>
              <select
                id="dumpster_size_selector"
                className="mt-2 bg-white p-2 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 focus:border-2  sm:text-sm text-left"
                // onChange={({ target }) => onDumpsterSelect(target.value)}
              >

                <option value={DUMPSTER_SIZES.TEN}>{DUMPSTER_SIZES.TEN}</option>
                <option value={DUMPSTER_SIZES.FIFTEEN}>{DUMPSTER_SIZES.FIFTEEN}</option>
                <option value={DUMPSTER_SIZES.TWENTY}>{DUMPSTER_SIZES.TWENTY}</option>
                <option value={DUMPSTER_SIZES.THIRTY}>{DUMPSTER_SIZES.THIRTY}</option>
                <option value={DUMPSTER_SIZES.FOURTY}>{DUMPSTER_SIZES.FOURTY}</option>
                <option value={DUMPSTER_SIZES.FIFTY}>{DUMPSTER_SIZES.FIFTY}</option>

                {/* {insertDumpsterSizeChoices()} */}
              </select>
            </div>
          </div>

          {/* <button
            onClick={() => setActive(false)}
            className="absolute top-0 right-0 px-4 py-3 text-gray-600 hover:text-gray-500"
          >
            Close
          </button> */}
        </div>
        <div className="fixed inset-0 bg-black opacity-50"></div>
      </div>
    </>
  );
};

export default CreateOrderFrom;
