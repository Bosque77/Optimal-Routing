import React, { useEffect } from "react";
import icon from "./images/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { useDispatch } from "react-redux";

const SideNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setUserToken } = bindActionCreators(actionCreators, dispatch);

  // useEffect(() => {
  //     M.AutoInit()

  // }, [])

  const onSignOut = () => {
    console.log("inside onSignOut");
    window.localStorage.clear();
    setUserToken(null);
    navigate("/");
  };

  return (
    <div className="fixed h-screen w-64 bg-white overflow-y-auto shadow-md">
      <div className="h-auto">
        <img className="mx-auto w-32" src={icon} alt="website logo" />
        <div className="hover:bg-slate-200 mx-4 rounded-lg">
          <Link
            to="/landfill"
            className="block mt-4 text-gray-600 text-lg hover:text-gray-900 text-left ml-10 font-normal font-sans"
          >
            Landfills
          </Link>
        </div>
        <div className="hover:bg-slate-200 mx-4 rounded-lg">
          <Link
            to="/driver"
            className="block mt-2 text-gray-700 text-lg  hover:text-gray-900 text-left ml-10 font-normal"
          >
            Truck Drivers
          </Link>
        </div>
        <div className="hover:bg-slate-200 mx-4 rounded-lg">
          <Link
            to="/depot"
            className="block mt-2 text-gray-700 text-lg  hover:text-gray-900 text-left ml-10 font-normal"
          >
            Depots
          </Link>
        </div>
        <div className="hover:bg-slate-200 mx-4 rounded-lg">
          <Link
            to="/vehicle"
            className="block mt-2 text-gray-700 text-lg  hover:text-gray-900 text-left ml-10 font-normal"
          >
            Vehicles
          </Link>
        </div>
        <div className="hover:bg-slate-200 mx-4 rounded-lg">
          <Link
            to="/order"
            className="block mt-2 text-gray-700 text-lg  hover:text-gray-900 text-left ml-10 font-normal"
          >
            Orders
          </Link>
        </div>
        <div className="hover:bg-slate-200 mx-4 rounded-lg">
          <Link
            to="/route"
            className="block mt-2 text-gray-700 text-lg  hover:text-gray-900 text-left ml-10 font-normal"
          >
            Routes
          </Link>
        </div>
      </div>
      <div className="absolute bottom-5 w-full">
        <button
          className="mx-auto mt-4 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded"
          onClick={() => onSignOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SideNav;
