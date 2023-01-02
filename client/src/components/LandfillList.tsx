import React, { useState } from "react";
import { Landfill } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../state";
import { useEffect } from "react";
import EditLandfillForm from "./EditLandfillForm";
import CreateLandfillForm from "./CreateLandfillForm";
import ConfirmDelete from "./ConfirmDelete";

const LandfillList = () => {
  const dispatch = useDispatch();

  const { updateLandfill } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    // M.AutoInit()
  }, []);

  const landfills = useSelector((state: State) => state.landfills);
  const [landfill, setLandfill] = useState<Landfill>(landfills[0]);
  const [editFormActive, setEditFormActive] = useState(false);
  const [createFormActive, setCreateFormActive] = useState(false);
  const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);

  const changeLandfillStatus = (landfill: Landfill) => {
    console.log("inside on click");
    const new_landfill = { ...landfill };
    if (landfill.active) {
      new_landfill.active = false;
    } else {
      new_landfill.active = true;
    }
    updateLandfill(new_landfill);
  };

  const editLandfill = (landfill: Landfill) => {
    setLandfill(landfill);
    setEditFormActive(true);
  };

  const onDeleteLandfill = (landfill: Landfill) => {
    console.log("inside delete landfill");
    setLandfill(landfill);
    setConfirmDeleteActive(true);
  };

  const onCreateLandfill = () => {
    setCreateFormActive(true);
  };

  const insertLandfills = () => {
    return landfills.map((landfill) => (
      <tr key={landfill.id}  className="border-b bg-white">
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{landfill.name}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{landfill.street}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{landfill.city}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">{landfill.zipcode}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">{landfill.latitude}</td>
        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-right">{landfill.longitude}</td>
        {/* <td>{(landfill.active) ? <p><label><input type="checkbox" checked={true} onChange={() => changeLandfillStatus(landfill)} /><span>Active</span></label> </p> : <p><label><input type="checkbox" checked={false} onChange={() => changeLandfillStatus(landfill)} /><span>Inactive</span></label> </p>}</td>
                    <td> <button className="btn-floating btn waves-light red" onClick={() => editLandfill(landfill)}><i className="material-icons">mode_edit</i></button></td>
                    <td> <button className="btn-floating btn black" onClick={() => onDeleteLandfill(landfill)}><i className="material-icons">delete</i></button></td> */}
      </tr>
    ));
  };

  return (
    <div className="">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b bg-slate-200">
                {/* <div>
                <br></br>
                <div className="col offset-s10">
                    <button className='btn black offset-s10' onClick={() => onCreateLandfill()}>New Landfill</button>
                </div>

            </div> */}

                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center" >Name</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">Street</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">City</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-right">Zipcode</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-right">Latitude</th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-right">Longitude</th>
                  {/* <th>Active</th> */}
                </tr>
              </thead>

              <tbody>{insertLandfills()}</tbody>

              {/* {editFormActive && (
        <EditLandfillForm landfill={landfill} setActive={setEditFormActive} />
      )}
      {createFormActive && (
        <CreateLandfillForm setActive={setCreateFormActive} />
      )}
      {confirmDeleteActive && (
        <ConfirmDelete setActive={setConfirmDeleteActive} landfill={landfill} />
      )} */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandfillList;
