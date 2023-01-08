import React from "react";

import {Severity} from "../types"


interface prop {
    message: string;
    severity: Severity;
    open: boolean;
}

const Alert = ({message, severity, open}: prop) => {


    const get_jsx_msg = () => {
        switch(severity) {
            case "success":
                return (
                    <div className="fixed top-0 right-0 w-full max-w-sm mx-auto mt-4">
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
                    <div className="fixed top-0 right-0 w-full max-w-sm mx-auto mt-4">
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                            Error
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                            <p>{message}</p>
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
    }

    return (
        <>
            {open && get_jsx_msg()}
        </>
    );
}


export default Alert;
