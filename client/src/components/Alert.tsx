import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../state";
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import { bindActionCreators } from "redux";


const Alert = () => {


  const alert_data = useSelector((state: State) => state.alert_data);
  const dispatch = useDispatch();
  const { hideAlert
  } = bindActionCreators(actionCreators, dispatch);

  const isVisible = alert_data.isVisible;
  const message = alert_data.message;
  const severity = alert_data.severity;


  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
          hideAlert("", severity) // Close alert after timeout
      }, 3000);
  
      // Clear the previous timeout when the effect is re-run
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible]);



  const get_jsx_msg = () => {

    switch (severity) {
      case "success":
        return (
          <div className="fixed top-0 right-0 flex mx-auto mt-4 mr-4 transition ease-in-out delay-150 z-30">
            <div className="bg-white border-t-4 border-slate-900 rounded-b text-slate-900 px-4 py-3 shadow-md flex flex-row" role="alert">
              <div ><svg className="fill-current h-6 w-6 text-slate-900 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
              <div>
                <p className="text-sm">{message}</p>
              </div>
            </div>
          </div>
        );
      case "error":
        return (
          <div className="fixed top-0 right-0 flex mx-auto mt-4 mr-4 transition ease-in-out delay-150 z-30">
            <div className="bg-white border-t-4 border-red-500 rounded-b text-red-500 px-4 py-3 shadow-md flex flex-row" role="alert">      
              <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mx-auto mr-4" />
              <div>
                <p className="text-sm">{message}</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="fixed top-0 right-0 flex mx-auto mt-4 mr-4 transition ease-in-out delay-150 z-30">
            <div className="bg-white border-t-4 border-slate-900 rounded-b text-slate-900 px-4 py-3 shadow-md flex flex-row" role="alert">
                 <div>
                <p className="text-sm">{message}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return <>{isVisible == true && message != "" && get_jsx_msg()}</>;
};

export default Alert;
