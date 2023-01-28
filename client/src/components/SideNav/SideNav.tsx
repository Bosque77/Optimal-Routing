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
      <div className="flex flex-col">
        <img className="mx-auto w-32 flex" src={icon} alt="website logo" />
        <div className="hover:bg-slate-200 mx-4 rounded-lg ">
          <Link
            to="/home"
            className="block text-gray-900 text-lg hover:text-black  font-medium"
          >
         Home
          </Link>
        </div>
        <div className="hover:bg-slate-200 rounded-lg mx-4">
          <Link
            to="/routes"
            className="text-black text-lg  hover:text-gray-900 font-medium"
          >
            Routes
          </Link>
        </div>
      </div>
      <div className="absolute bottom-12 w-full">
        
        <button
          className="mx-auto mt-4 py-2 px-4 bg-gray-300 hover:bg-black hover:text-white text-black font-bold rounded drop-shadow hover:drop-shadow active:scale-90"
          onClick={() => onSignOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SideNav;
