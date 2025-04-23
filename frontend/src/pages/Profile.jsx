
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { userRole } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data - would come from API in a real app
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, Anytown, AN 12345',
    bloodGroup: 'B+',
    aadhaarNumber: '1234-5678-9012', // For Indian context
    medicalConditions: 'None',
    emergencyContact: 'Jane Doe, +1 234 567 8901',
    // Donor specific
    lastDonationDate: '2023-05-15',
    donationCount: 5,
    // Blood Bank specific
    bankName: 'City Central Blood Bank',
    licenseNumber: 'BB-12345-MH',
    operatingHours: '9:00 AM - 5:00 PM (Mon-Sat)'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated profile:', profileData);
    setIsEditing(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-8">
        <div className="bg-gradient-to-br from-blood-red-50 to-blood-red-100 rounded-2xl shadow-lg p-1">
          <div className="bg-white rounded-xl shadow-sm px-0 md:px-6 py-6 md:py-8">
            <div className="flex items-center mb-6">
              <div className="bg-blood-red-100 text-blood-red-600 rounded-full h-16 w-16 flex items-center justify-center text-3xl font-bold shadow-inner">
                {profileData.name.charAt(0)}
              </div>
              <div className="ml-5">
                <h3 className="text-xl font-bold text-blood-red-900">{profileData.name}</h3>
                <p className="text-gray-500">
                  {userRole === 'donor' ? 'Donor' : userRole === 'bloodbank' ? 'Blood Bank' : 'Patient'}
                </p>
                {userRole === 'donor' && (
                  <span className="inline-block mt-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full shadow">
                    Eligible to Donate
                  </span>
                )}
              </div>
              <div className="ml-auto">
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="bg-blood-red-50 text-blood-red-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-blood-red-100 transition-colors border border-blood-red-100 shadow"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-100 text-gray-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-200 shadow"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            {!isEditing ? (
              <div>
                <div className="border-t border-blood-red-50 pt-4 grid md:grid-cols-2 gap-5">
                  {/* Common fields */}
                  <div>
                    <h4 className="text-gray-400 text-xs uppercase mb-1">Email</h4>
                    <p className="text-gray-800">{profileData.email}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-xs uppercase mb-1">Phone</h4>
                    <p className="text-gray-800">{profileData.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-xs uppercase mb-1">Address</h4>
                    <p className="text-gray-800">{profileData.address}</p>
                  </div>
                  {userRole !== 'bloodbank' && (
                    <>
                      <div>
                        <h4 className="text-gray-400 text-xs uppercase mb-1">Blood Group</h4>
                        <p className="text-gray-800">{profileData.bloodGroup}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-xs uppercase mb-1">Aadhaar Number</h4>
                        <p className="text-gray-800">{profileData.aadhaarNumber}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-xs uppercase mb-1">Medical Conditions</h4>
                        <p className="text-gray-800">{profileData.medicalConditions}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-xs uppercase mb-1">Emergency Contact</h4>
                        <p className="text-gray-800">{profileData.emergencyContact}</p>
                      </div>
                    </>
                  )}
                  {userRole === 'donor' && (
                    <>
                      <div>
                        <h4 className="text-gray-400 text-xs uppercase mb-1">Last Donation Date</h4>
                        <p className="text-gray-800">{profileData.lastDonationDate}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-xs uppercase mb-1">Total Donations</h4>
                        <p className="text-gray-800">{profileData.donationCount}</p>
                      </div>
                    </>
                  )}
                  {userRole === 'bloodbank' && (
                    <>
                      <div>
                        <h4 className="text-gray-400 text-xs uppercase mb-1">Bank Name</h4>
                        <p className="text-gray-800">{profileData.bankName}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-xs uppercase mb-1">License Number</h4>
                        <p className="text-gray-800">{profileData.licenseNumber}</p>
                      </div>
                      <div>
                        <h4 className="text-gray-400 text-xs uppercase mb-1">Operating Hours</h4>
                        <p className="text-gray-800">{profileData.operatingHours}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-2 grid md:grid-cols-2 gap-5">
                {/* Editable common fields */}
                <div>
                  <label className="block text-gray-500 mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1 font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1 font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                  />
                </div>
                {userRole !== 'bloodbank' && (
                  <>
                    <div>
                      <label className="block text-gray-500 mb-1 font-medium">Blood Group</label>
                      <select
                        name="bloodGroup"
                        value={profileData.bloodGroup}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 font-medium">Aadhaar Number</label>
                      <input
                        type="text"
                        name="aadhaarNumber"
                        value={profileData.aadhaarNumber}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 font-medium">Medical Conditions</label>
                      <input
                        type="text"
                        name="medicalConditions"
                        value={profileData.medicalConditions}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 font-medium">Emergency Contact</label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                      />
                    </div>
                  </>
                )}
                {userRole === 'bloodbank' && (
                  <>
                    <div>
                      <label className="block text-gray-500 mb-1 font-medium">Bank Name</label>
                      <input
                        type="text"
                        name="bankName"
                        value={profileData.bankName}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 font-medium">License Number</label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={profileData.licenseNumber}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-500 mb-1 font-medium">Operating Hours</label>
                      <input
                        type="text"
                        name="operatingHours"
                        value={profileData.operatingHours}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                      />
                    </div>
                  </>
                )}
                <div className="md:col-span-2 flex justify-end items-center mt-2">
                  <button
                    type="submit"
                    className="bg-blood-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blood-red-700 transition-colors shadow"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {userRole === 'donor' && (
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl shadow-lg p-1">
          <div className="bg-white rounded-xl px-0 md:px-6 py-6 md:py-8">
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-bold text-emerald-900">Donation History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-xl overflow-hidden shadow-sm bg-white">
                <thead>
                  <tr className="bg-emerald-50 text-emerald-700">
                    <th className="py-2 px-4 border-b text-left font-semibold">Date</th>
                    <th className="py-2 px-4 border-b text-left font-semibold">Blood Bank</th>
                    <th className="py-2 px-4 border-b text-left font-semibold">Units</th>
                    <th className="py-2 px-4 border-b text-left font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-gray-50 even:bg-white">
                    <td className="py-3 px-4 border-b">May 15, 2023</td>
                    <td className="py-3 px-4 border-b">City Central Blood Bank</td>
                    <td className="py-3 px-4 border-b">1</td>
                    <td className="py-3 px-4 border-b">Whole Blood</td>
                  </tr>
                  <tr className="odd:bg-gray-50 even:bg-white">
                    <td className="py-3 px-4 border-b">Jan 10, 2023</td>
                    <td className="py-3 px-4 border-b">Medical University Blood Center</td>
                    <td className="py-3 px-4 border-b">1</td>
                    <td className="py-3 px-4 border-b">Whole Blood</td>
                  </tr>
                  <tr className="odd:bg-gray-50 even:bg-white">
                    <td className="py-3 px-4 border-b">Sep 22, 2022</td>
                    <td className="py-3 px-4 border-b">East District Blood Bank</td>
                    <td className="py-3 px-4 border-b">1</td>
                    <td className="py-3 px-4 border-b">Platelets</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

