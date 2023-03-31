import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import { Depot, Driver, Landfill, Order, Vehicle } from "../types";

interface props {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  landfill?: Landfill;
  driver?: Driver;
  depot?: Depot;
  vehicle?: Vehicle;
  order?: Order;
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
  } = bindActionCreators(actionCreators, dispatch);

  React.useEffect(() => {
    const modal = document.querySelector("#confirm_delete");
    if (modal) {
    }
  }, []);

  const handleConfirmation = (status: boolean) => {
    if (status) {
      if (landfill) {
        deleteLandfill(landfill);
      } else if (driver) {
        deleteDriver(driver);
      } else if (depot) {
        deleteDepot(depot);
      } else if (vehicle) {
        deleteVehicle(vehicle);
      } else if (order) {
        deleteOrder(order);
      }
    }
    setActive(false);
  };

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center z-20 fixed top-0 left-0">
        <div className="bg-white px-12 pb-6 rounded-lg shadow-xl z-10 flex flex-col  overflow-hidden ">
          <div>Are you sure you want to delete this item?</div>
          <br />
          <div className="row">
            <div className="col s4"></div>
            <div className="col s2">
              <button
                onClick={() => handleConfirmation(true)}
                className="btn black modal-close"
              >
                Yes
              </button>
            </div>
            <div className="col s2">
              <button
                onClick={() => handleConfirmation(false)}
                className="btn black modal-close"
              >
                No
              </button>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 bg-black opacity-50"></div>
      </div>
    </>
  );
};

export default ConfirmDelete;
