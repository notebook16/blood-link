import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BloodRequestForm = ({ selectedLocation, onRequestSubmit }) => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [formData, setFormData] = useState({
    patientName: '',
    hospitalName: '',
    bloodGroup: 'A+',
    units: 1,
    urgency: 'normal',
    contactNumber: '',
    additionalInfo: '',
    useCurrentAddress: false,
  });

  const [requestID, setRequestID] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationAddress, setLocationAddress] = useState('');
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    // Fetch the user ID (requestID) from localStorage
    const storedRequestID = localStorage.getItem('userIdx');
    setRequestID(storedRequestID);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'units' ? parseInt(value, 10) || '' : value
    });
  };

  const handleUseCurrentAddress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });

        // Fetch the human-readable address using reverse geocoding (OpenStreetMap Nominatim)
        try {
          const geoResponse = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const { display_name } = geoResponse.data;
          setLocationAddress(display_name); // Set the decoded address
        } catch (error) {
          console.error("Error decoding the location:", error);
        }

        setLocationFetched(true);
        setFormData({
          ...formData,
          useCurrentAddress: true,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requestData = {
      ...formData,
      requestID,
      location: currentLocation || selectedLocation || { lat: 51.505, lng: -0.09 } // Default if no location
    };
  
    console.log('Submitting blood request:', requestData);
    onRequestSubmit(requestData);
  
    try {
      const response = await axios.post(`${serverUrl}/api/requests/${requestID}`, requestData);
      console.log('Request submitted:', response.data);
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="patientName" className="block text-gray-700 mb-1">Patient Name*</label>
        <input
          type="text"
          id="patientName"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="hospitalName" className="block text-gray-700 mb-1">Hospital Name*</label>
        <input
          type="text"
          id="hospitalName"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="bloodGroup" className="block text-gray-700 mb-1">Blood Group*</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="units" className="block text-gray-700 mb-1">Units Required*</label>
          <input
            type="number"
            id="units"
            name="units"
            value={formData.units}
            onChange={handleChange}
            min="1"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="urgency" className="block text-gray-700 mb-1">Urgency Level*</label>
        <select
          id="urgency"
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div>
        <label htmlFor="contactNumber" className="block text-gray-700 mb-1">Contact Number*</label>
        <input
          type="tel"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        />
      </div>

      {/* Use Current Address Button */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleUseCurrentAddress}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md"
        >
          Use Current Address
        </button>
      </div>

      {/* Animation and Address Display */}
      {locationFetched && (
        <div className="flex items-center space-x-2 mt-2">
          <svg className="w-6 h-6 text-green-500 animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 3a1 1 0 011 1v4a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M5 9a1 1 0 011 1v4a1 1 0 11-2 0V10a1 1 0 011-1z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M13 9a1 1 0 011 1v4a1 1 0 11-2 0V10a1 1 0 011-1z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M17 3a1 1 0 011 1v4a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Location fetched successfully!</span>
        </div>
      )}

      {/* Show the decoded address */}
      {locationAddress && (
        <div className="text-sm text-gray-600 mt-2">
          <strong>Current Address:</strong> {locationAddress}
        </div>
      )}

      <button 
        type="submit"
        className="w-full bg-blood-red-600 hover:bg-blood-red-700 text-white py-3 rounded-md font-medium transition-colors"
      >
        Submit Blood Request
      </button>
    </form>
  );
};

export default BloodRequestForm;
