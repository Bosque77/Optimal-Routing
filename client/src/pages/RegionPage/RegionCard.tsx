import React, { useState } from 'react';

interface prop {
  region: any
}

const RegionCard = ({ region }: prop) => {
  const [state, setState] = useState({
    latitude: region.latitude,
    longitude: region.longitude
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col w-64 h-64 bg-white rounded-xl shadow-md p-4 overflow-auto">
      <h2 className="text-2xl font-bold text-center mb-2">{region.name}</h2>
      <div className="mb-4 space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-600">Landfills</h3>
          <p className="text-lg font-bold text-gray-800">{region.landfills}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-600">Depots</h3>
          <p className="text-lg font-bold text-gray-800">{region.depots}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-600">Daily Orders</h3>
          <p className="text-lg font-bold text-gray-800">{region.dailyOrders}</p>
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
