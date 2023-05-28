import React, { useState } from 'react';
import { PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../state";
import { bindActionCreators } from "redux";
import { HttpResponse } from '../../../../shared/types';


const AddRegionCard = () => {

  const dispatch = useDispatch();
  const { createRegion, showAlert } = bindActionCreators(
    actionCreators,
    dispatch
  );
  
  const [editing, setEditing] = useState(false);
  const [newRegion, setNewRegion] = useState({
    name: "",
    latitude: "",
    longitude: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRegion({
      ...newRegion,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveClick = async () => {
    const new_region = {
      name: newRegion.name,
      latitude: parseFloat(newRegion.latitude),
      longitude: parseFloat(newRegion.longitude),
    };

    const response = await createRegion(new_region) as unknown as HttpResponse;
    if (response.status === "OK") {
      showAlert("Region created successfully","success");
    } else {
      showAlert("Region creation failed","error");
    }

    setEditing(false);
    setNewRegion({ name: "", latitude: "", longitude: "" });
  };

  return (
    <div 
      className="flex flex-col w-64 h-72 bg-white rounded-xl shadow-md p-4 overflow-auto justify-center items-center cursor-pointer  transition-colors duration-200 ease-in-out"
    >
      {!editing ? (
        <>
          <h2 className="text-lg font-medium text-center text-gray-400 mb-4">Add New Region</h2>
          <PlusCircleIcon className="w-16 h-16 text-gray-500 hover:text-gray-700 transition-colors duration-200 ease-in-out" onClick={() => setEditing(true)} />
        </>
      ) : (
        <>
          <input 
            type="text"
            name="name"
            placeholder="Region Name"
            value={newRegion.name}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 w-full mb-2 text-sm text-gray-700"
          />
          <div className="flex space-x-2 mb-2">
            <input 
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={newRegion.latitude}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 w-1/2 text-sm text-gray-700"
            />
            <input 
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={newRegion.longitude}
              onChange={handleInputChange}
              className="border rounded-md px-2 py-1 w-1/2 text-sm text-gray-700"
            />
          </div>
          <CheckCircleIcon className="w-16 h-16 text-gray-500 hover:text-gray-700 transition-colors duration-200 ease-in-out" onClick={handleSaveClick} />
        </>
      )}
    </div>
  );
};

export default AddRegionCard;
