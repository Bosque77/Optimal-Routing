import React, { useState } from 'react';
import useRegionInfo from '../../components/hooks/useRegionInfo';
import { MinusCircleIcon } from '@heroicons/react/24/outline';

interface prop {
  region: any,
  selectedDate: Date
}

const RegionCard = ({ region, selectedDate }: prop) => {
  const [state, setState] = useState({
    latitude: region.latitude,
    longitude: region.longitude
  });

  const [num_of_orders, num_of_landfills, num_of_depots] = useRegionInfo(region.id, selectedDate)

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col w-64 h-72 bg-white rounded-xl shadow-md p-4 overflow-auto">
      <div className='flex flex-row justify-end'> < MinusCircleIcon className="w-6 h-6 mb-4 hover:scale-110 active:scale-90 " /> </div>
      <h2 className="text-2xl font-bold text-center mb-2">{region.name}</h2>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-600">Landfills</h3>
          <p className="text-lg font-bold text-gray-800">{num_of_landfills}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-600">Depots</h3>
          <p className="text-lg font-bold text-gray-800">{num_of_depots}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-600">Daily Orders</h3>
          <p className="text-lg font-bold text-gray-800">{num_of_orders}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Latitude</label>
          <input 
            type="text"
            name="latitude"
            value={state.latitude}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 w-full text-sm text-gray-700"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-600 mb-1">Longitude</label>
          <input 
            type="text"
            name="longitude"
            value={state.longitude}
            onChange={handleInputChange}
            className="border rounded-md px-2 py-1 w-full text-sm text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default RegionCard;
