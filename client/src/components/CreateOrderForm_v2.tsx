import React, { useState } from "react";

interface prop {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateOrderFrom = ({ setActive }: prop) => {
  return (
    <>
      <div className="fixed h-screen w-screen flex items-center justify-center">
        <div className="bg-white px-4 py-6 rounded-lg shadow-xl absolute z-50 w-1/2 h-1/2 flex flex-col">
          <div className="flex flex-row">
            <div className="flex flex-col">
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
                className=" border rounded-md pl-2 pr-12 py-2 mt-2 focus:outline-none focus:border-indigo-500 focus:border-2 sm:text-sm text-left mr-3"
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
                className=" border rounded-md border-gray-300 pl-2 pr-12 py-2 mt-2 focus:border-indigo-500 focus:ring-indigo-500  sm:text-sm text-left "
                placeholder="Last Name"
              />
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
