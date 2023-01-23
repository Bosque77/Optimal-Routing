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
          <div className="fixed top-0 right-0 w-full max-w-sm mx-auto mt-4  ">
            <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
              Success
            </div>
            <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
              <p>{message}</p>
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
