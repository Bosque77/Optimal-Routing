import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import {
  Depot,
  Driver,
  HttpResponse,
  Landfill,
  Order,
  TruckRoute,
  Vehicle,
} from "../../../shared/types";

interface props {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  landfill?: Landfill;
  driver?: Driver;
  depot?: Depot;
  vehicle?: Vehicle;
  order?: Order;
  truckRoute?: TruckRoute;
}

const ConfirmDelete = ({
  setActive,
  landfill,
  driver,
  depot,
  vehicle,
  order,
}: props) => {
  const dispatch = useDispatch();
  const {
    deleteLandfill,
    deleteDriver,
    deleteDepot,
    deleteVehicle,
    deleteOrder,
    setAlert,
  } = bindActionCreators(actionCreators, dispatch);

  const alert_data = useSelector((state: State) => state.alert_data);

  React.useEffect(() => {
    const modal = document.querySelector("#confirm_delete");
    if (modal) {
    }
  }, []);

  const handleConfirmation = async (status: boolean) => {
    if (status) {
      if (landfill) {
        console.log('inside confirm delete')
        const response = await deleteLandfill(
          landfill
        ) as unknown as HttpResponse;
        console.log(response)
        if (response.status === "ERROR") {
          setAlert(
            "Error Deleting Landfill. Server is having issues, try again later.",
            "error",
            3000, alert_data.id+1
          );
        } else {
          setAlert("Landfill Deleted Successfully", "info", 3000, alert_data.id+1);
          setActive(false);
        }
      } else if (driver) {
        deleteDriver(driver);
      } else if (depot) {
        console.log('inside confirm delete')
        const response = await deleteDepot(
          depot
        ) as unknown as HttpResponse;
        console.log(response)
        if (response.status === "ERROR") {
          setAlert(
            "Error Deleting Depot. Server is having issues, try again later.",
            "error",
            3000,alert_data.id+1
          );
        } else {
          setAlert("Depot Deleted Successfully", "info", 3000, alert_data.id+1);
          setActive(false);
        }
      } else if (vehicle) {
        deleteVehicle(vehicle);
      } else if (order) {
        const response = await deleteOrder(
          order
        ) as unknown as HttpResponse;
        console.log(response)
        if (response.status === "ERROR") {
          setAlert(
            "Error Deleting Order. Server is having issues, try again later.",
            "error",
            3000, alert_data.id+1
          );
        } else {
          setAlert("Order Deleted Successfully", "info", 3000, alert_data.id+1);
          setActive(false);
        }
      }
    }
    setActive(false);
  };

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center z-10 fixed top-0 left-0">
        <div className="bg-white px-12 py-8 rounded-lg shadow-xl z-10 flex flex-col  overflow-hidden ">
          <div>Are you sure you want to delete this item?</div>
          <div className="flex justify-end">
            <button
              onClick={() => handleConfirmation(false)}
              className="px-4 py-2 text-black hover:underline hover:underline-offset-1 mt-4 mr-4"
            >
              Cancel
            </button>
            <button
              onClick={() => handleConfirmation(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 hover:text-white mt-4"
            >
              Yes
            </button>
          </div>
        </div>
        <div className="fixed inset-0 bg-black opacity-50"></div>
      </div>
    </>
  );
};

export default ConfirmDelete;
