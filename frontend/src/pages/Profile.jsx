import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { userRole } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    bloodGroup: '',
    aadhaarNumber: '',
    medicalConditions: '',
    emergencyContact: '',
    lastDonationDate: '',
    donationCount: 0,
    bankName: '',
    licenseNumber: '',
    operatingHours: ''
  });
  const [requestID, setRequestID] = useState('');

  // Fetch requestID once
  useEffect(() => {
    const storedRequestID = localStorage.getItem('userIdx');
    setRequestID(storedRequestID);
  }, []);

  // Fetch profile on mount or when requestID changes
  useEffect(() => {
    if (!requestID) return;
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/profile/${requestID}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    })();
  }, [requestID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/user/profile/${requestID}`,
        profileData
      );
      // refetch updated data
      const response = await axios.get(
        `http://localhost:5000/api/user/profile/${requestID}`
      );
      setProfileData(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-8 bg-gradient-to-br from-blood-red-50 to-blood-red-100 rounded-2xl shadow-lg p-1">
        <div className="bg-white rounded-xl shadow-sm px-6 py-8">
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
              <button
                onClick={() => setIsEditing(prev => !prev)}
                className={`px-5 py-2 rounded-md text-sm font-medium shadow transition-colors border 
                  ${isEditing
                    ? 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    : 'bg-blood-red-50 text-blood-red-700 border-blood-red-100 hover:bg-blood-red-100'}`}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
              {Object.entries(profileData).map(([key, val]) => (
                <div key={key} className="flex flex-col">
                  <label className="text-gray-500 mb-1 font-medium capitalize">{key}</label>
                  <input
                    type={key === 'lastDonationDate' ? 'date' : key === 'donationCount' ? 'number' : 'text'}
                    name={key}
                    value={val || ''}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blood-red-100 bg-gray-50"
                  />
                </div>
              ))}
              <div className="md:col-span-2 flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blood-red-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blood-red-700 transition-colors shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="border-t border-blood-red-50 pt-4 grid md:grid-cols-2 gap-5">
              {/* display fields */}
              <div>
                <h4 className="text-gray-400 text-xs uppercase mb-1">Email</h4>
                <p className="text-gray-800">{profileData.email}</p>
              </div>
              <div>
                <h4 className="text-gray-400 text-xs uppercase mb-1">Phone</h4>
                <p className="text-gray-800">{profileData.contactNumber}</p>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
