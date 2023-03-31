import EditLandfillForm from "./EditLandfillForm";
import ConfirmDelete from "./ConfirmDelete";
import { PencilIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Landfill } from "../types";
import { useDispatch} from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
import CreateLandfillForm from "./CreateLandfillForm";

interface prop {
    landfills: Landfill[];
    setCreateLandfillModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    setLandfill: React.Dispatch<React.SetStateAction<Landfill | undefined>>;
    setConfirmDeleteActive: React.Dispatch<React.SetStateAction<boolean>>;
  }
  

const LandfillList = ({ landfills, setCreateLandfillModalActive, setConfirmDeleteActive,setLandfill }: prop) => {
    const dispatch = useDispatch();
  
    const { updateLandfill } = bindActionCreators(actionCreators, dispatch);
  
    // const changeLandfillStatus = (landfill: Landfill) => {
    //   console.log("inside on click");
    //   const new_landfill = { ...landfill };
    //   if (landfill.active) {
    //     new_landfill.active = false;
    //   } else {
    //     new_landfill.active = true;
    //   }
    //   updateLandfill(new_landfill);
    // };
  
    const editLandfill = (landfill: Landfill) => {
      setLandfill(landfill);
      // setEditFormActive(true);
    };
  
    const onDeleteLandfill = (landfill: Landfill) => {
      console.log("inside delete landfill");
      setLandfill(landfill);
      setConfirmDeleteActive(true);
    };
  

    const insertLandfills = () => {
      return landfills.map((landfill) => (
        <tr key={landfill.id} className="border-b bg-white">
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
            {landfill.name}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
            {landfill.street}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
            {landfill.city}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap text-right">
            {landfill.zipcode}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap text-right">
            {landfill.latitude}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap text-right">
            {landfill.longitude}
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
            <PencilIcon className="w-6 h-6 mr-3 black stroke-0 cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:drop-shadow-none active:scale-95" />
          </td>
          <td className="text-sm text-gray-900 font-normal px-6 py-4 whitespace-nowrap border-none">
            <button onClick={() => onDeleteLandfill(landfill)}>
              <TrashIcon className="w-6 h-6 mr-3 black stroke-0  cursor-pointer transform hover:-translate-y-1 hover:scale-105 active:drop-shadow-none active:scale-95" />
            </button>
          </td>
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
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                    >
                      Street
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-center"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    >
                      Zipcode
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    >
                      Latitude
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-right"
                    >
                      Longitude
                    </th>
                    <th></th>
                    <th></th>
                    {/* <th>Active</th> */}
                  </tr>
                </thead>
  
                <tbody>{insertLandfills()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LandfillList