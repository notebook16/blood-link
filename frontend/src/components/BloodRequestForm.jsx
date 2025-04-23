
import React, { useState } from 'react';

const BloodRequestForm = ({ selectedLocation, onRequestSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    hospitalName: '',
    bloodGroup: 'A+',
    units: 1,
    urgency: 'normal',
    contactNumber: '',
    additionalInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'units' ? parseInt(value, 10) || '' : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would include location data from selectedLocation
    const requestData = {
      ...formData,
      location: selectedLocation || { lat: 51.505, lng: -0.09 } // Default if no location selected
    };
    console.log('Submitting blood request:', requestData);
    onRequestSubmit(requestData);
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

      <div>
        <label htmlFor="additionalInfo" className="block text-gray-700 mb-1">Additional Information</label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          rows="3"
          className="w-full border border-gray-300 rounded-md px-4 py-2"
        ></textarea>
      </div>

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
