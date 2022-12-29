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
    <div className="fixed h-screen w-64 bg-slate-50 overflow-y-auto">
      <div className="h-auto">
        <img className="mx-auto w-32" src={icon} alt="website logo" />
        <Link to="/landfill" className="block mt-4 text-gray-700 text-lg font-semibold hover:text-gray-500">Landfills</Link>
        <Link to="/driver" className="block mt-4 text-gray-700 text-lg font-semibold hover:text-gray-500">Truck Drivers</Link>
        <Link to="/depot" className="block mt-4 text-gray-700 text-lg font-semibold hover:text-gray-500">Depots</Link>
        <Link to="/vehicle" className="block mt-4 text-gray-700 text-lg font-semibold hover:text-gray-500">Vehicles</Link>
        <Link to="/order" className="block mt-4 text-gray-700 text-lg font-semibold hover:text-gray-500">Orders</Link>
        <Link to="/route" className="block mt-4 text-gray-700 text-lg font-semibold hover:text-gray-500">Routes</Link>
      </div>
      <div className="absolute bottom-5 w-full">
        <button className="mx-auto mt-4 py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded" onClick={() => onSignOut()}>Sign Out</button>
      </div>
    </div>
  );
};

export default SideNav;
