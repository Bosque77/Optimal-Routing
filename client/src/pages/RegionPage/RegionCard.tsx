import React, { useState } from 'react';
import useRegionInfo from '../../components/hooks/useRegionInfo';
import { MinusCircleIcon } from '@heroicons/react/24/outline';
import ConfirmDelete from 'components/ConfirmDelete';

interface prop {
  region: any,
  selectedDate: Date
}

const RegionCard = ({ region, selectedDate }: prop) => {
  const [state, setState] = useState({
    latitude: region.latitude,
    longitude: region.longitude
  });

  const [confirmDeleteActive, setConfirmDeleteActive] = useState<boolean>(false);

  const [num_of_orders, num_of_landfills, num_of_depots] = useRegionInfo(region.id, selectedDate)

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const deleteRegion = () => {
    console.log("delete region")
    setConfirmDeleteActive(true);
  }

  return (
    <div className="flex flex-col w-72 h-94 bg-white rounded shadow-md p-4 overflow-auto">
      <div className='flex flex-row justify-end'> 
        <MinusCircleIcon className="w-6 h-6 mb-4 text-red-500 hover:scale-110 active:scale-90 cursor-pointer" onClick={deleteRegion} /> 
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">{region.name}</h2>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-600">Landfills</h3>
          <p className="text-lg text-gray-800">{num_of_landfills}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className=" text-gray-600">Depots</h3>
          <p className="text-lg  text-gray-800">{num_of_depots}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-gray-600">Daily Orders</h3>
          <p className="text-lgtext-gray-800">{num_of_orders}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-2 mt-4">
        <div className="">
          <div className="text-left text-sm font-medium text-gray-600 mb-1">Latitude</div>
          <input 
            type="text"
            name="latitude"
            value={state.latitude}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="">
          <div className="text-left text-sm font-medium text-gray-600 mb-1">Longitude</div>
          <input 
            type="text"
            name="longitude"
            value={state.longitude}
            onChange={handleInputChange}
            className="border border-gray-300 rounded px-2 py-1 w-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      {confirmDeleteActive && ( <ConfirmDelete setActive={setConfirmDeleteActive} region = {region}/> )}
    </div>
  );
};

export default RegionCard;
