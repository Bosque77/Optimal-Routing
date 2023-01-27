import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "../state";


const Alert = () => {


  const alert_data = useSelector((state: State) => state.alert_data);

  const message = alert_data.message;
  const severity = alert_data.severity;
  const time = alert_data.time;
  const [open, setOpen] = useState(false);


  useEffect(() => {
    setOpen(true)
    setTimeout(() => {
      setOpen(false);
    }, time);
  }, [alert_data, time]);



  const get_jsx_msg = () => {

    switch (severity) {
      case "success":
        return (
          <div className="fixed top-0 right-0 flex mx-auto mt-4 mr-4 transition ease-in-out delay-150 z-30">
            <div className="bg-slate-100 border-t-4 border-slate-900 rounded-b text-slate-900 px-4 py-3 shadow-md flex flex-row" role="alert">
              <div ><svg className="fill-current h-6 w-6 text-slate-900 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
              <div>
                <p className="text-sm">Make sure you know how these changes affect you.</p>
              </div>
            </div>
          </div>
        );
      case "error":
        return (
          <div className="fixed top-0 right-0 flex mx-auto mt-4 mr-4 transition ease-in-out delay-150 z-30">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative bg-opacity-100"
              role="alert"
            >
              <span className="block sm:inline">
                {message}
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </div>
          </div>
        );
      default:
        return (
          <div className="fixed top-0 right-0 w-full max-w-sm mx-auto mt-4">
            <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
              Generic
            </div>
            <div className="border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700">
              <p>{message}</p>
            </div>
          </div>
        );
    }
  };

  return <>{open && get_jsx_msg()}</>;
};

export default Alert;
