
import React from 'react';

// This would be a real map component in a production app using Leaflet or Google Maps
const BloodBankMap = ({ bloodBanks, onLocationSelect, height = "400px" }) => {
  // Mock implementation for the demo
  return (
    <div className="relative" style={{ height }}>
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p>Interactive Map Would Display Here</p>
          <p className="text-sm">(Using Leaflet or Google Maps API)</p>
          <div className="mt-4">
            <p className="font-medium">Blood Banks Shown:</p>
            <ul className="text-left max-w-xs mx-auto mt-2">
              {bloodBanks.map((bank) => (
                <li key={bank.id} className="mb-2 p-2 bg-white rounded shadow cursor-pointer" onClick={() => onLocationSelect(bank.location)}>
                  <div className="font-medium">{bank.name}</div>
                  <div className="text-xs text-gray-600">
                    Available: {bank.available.join(', ')}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button 
            className="mt-4 px-4 py-2 bg-blood-red-600 text-white rounded hover:bg-blood-red-700"
            onClick={() => onLocationSelect([51.505, -0.09])}
          >
            Use My Current Location
          </button>
        </div>
      </div>
    </div>
  );
};

export default BloodBankMap;
