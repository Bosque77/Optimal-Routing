import React, { useState } from "react";
import { Depot } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useEffect } from "react";
import EditDepotForm from "./EditDepotForm";
import CreateDepotForm from "./CreateDepotForm";
import ConfirmDelete from "./ConfirmDelete";

const DepotList = () => {
  const dispatch = useDispatch();

  const { updateDepot } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    // M.AutoInit()
  }, []);

  const depots = useSelector((state: State) => state.depots);
  const [depot, setdepot] = useState<Depot>(depots[0]);
  const [editFormActive, setEditFormActive] = useState(false);
  const [createFormActive, setCreateFormActive] = useState(false);
  const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);

  const changedepotStatus = (depot: Depot) => {
    console.log("inside on click");
    const new_depot = { ...depot };
    if (depot.active) {
      new_depot.active = false;
    } else {
      new_depot.active = true;
    }
    updateDepot(new_depot);
  };

  const editdepot = (depot: Depot) => {
    setdepot(depot);
    setEditFormActive(true);
  };

  const onDeletedepot = (depot: Depot) => {
    console.log("inside delete depot");
    setdepot(depot);
    setConfirmDeleteActive(true);
  };

  const onCreatedepot = () => {
    setCreateFormActive(true);
  };

  const insertdepots = () => {
    return depots.map((depot) => (
      <tr key={depot.id} className="border-b bg-white">
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{depot.name}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{depot.street}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{depot.city}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{depot.zipcode}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{depot.latitude}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{depot.longitude}</td>
        {/* <td>{(depot.active) ? <p><label><input type="checkbox" checked={true} onChange={() => changedepotStatus(depot)} /><span>Active</span></label> </p> : <p><label><input type="checkbox" checked={false} onChange={() => changedepotStatus(depot)} /><span>Inactive</span></label> </p>}</td>
                    <td> <button className="btn-floating btn waves-light red" onClick={() => editdepot(depot)}><i className="material-icons">mode_edit</i></button></td>
                    <td> <button className="btn-floating btn black" onClick={() => onDeletedepot(depot)}><i className="material-icons">delete</i></button></td> */}
      </tr>
    ));
  };

  return (
    <div className="">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full border">
              <thead className="border-b bg-slate-200">
                {/* <div className="col offset-s10">
                    <button className='btn black offset-s10' onClick={() => onCreatedepot()}>New depot</button>
                </div> */}

                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Name</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Street</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">City</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Zipcode</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Latitude</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Longitude</th>
                  {/* <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Active</th> */}
                </tr>
              </thead>

              <tbody>{insertdepots()}</tbody>

              {/* {editFormActive && <EditDepotForm depot={depot} setActive={setEditFormActive}  />}
            {createFormActive && <CreateDepotForm setActive={setCreateFormActive}  />}
            {confirmDeleteActive && <ConfirmDelete setActive={setConfirmDeleteActive} depot={depot} />} */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepotList;
