import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Stock = () => {
  const { userRole } = useAuth();
  const [bloodStock, setBloodStock] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    setTimeout(() => {
      const mockStock = {
        'A+': 12,
        'A-': 5,
        'B+': 8,
        'B-': 3,
        'AB+': 4,
        'AB-': 1,
        'O+': 15,
        'O-': 7,
      };
      setBloodStock(mockStock);
      setEditValues(mockStock);
      setLoading(false);
    }, 500);
  }, []);

  const handleEditChange = (bloodType, value) => {
    setEditValues({
      ...editValues,
      [bloodType]: parseInt(value, 10) || 0
    });
  };

  const handleSave = () => {
    setBloodStock(editValues);
    setEditMode(false);
    alert('Blood stock updated successfully');
  };

  const getAvailabilityClass = (units) => {
    if (units <= 0) return 'bg-red-100 text-red-800';
    if (units < 3) return 'bg-yellow-100 text-yellow-800';
    if (units < 7) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getAvailabilityText = (units) => {
    if (units <= 0) return 'None';
    if (units < 3) return 'Critical';
    if (units < 7) return 'Low';
    return 'Good';
  };

  // if (userRole && userRole !== 'bloodbank') {
  //   return (
  //     <div className="container mx-auto px-4 py-10 max-w-2xl">
  //       <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-xl shadow">
  //         <div className="flex items-center">
  //           <svg className="h-7 w-7 text-yellow-400 mr-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
  //             <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  //           </svg>
  //           <p className="text-base text-yellow-700">
  //             Access restricted. Only blood banks can view and manage blood stock.
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold text-blood-red-800 mb-3 md:mb-0">Blood Stock Management</h1>
        {userRole === 'bloodbank' && (
          !editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="px-5 py-2 bg-blood-red-50 text-blood-red-700 rounded-md hover:bg-blood-red-100 border border-blood-red-100 font-medium transition-colors shadow"
            >
              Edit Stock
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={handleSave}
                className="px-5 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200 border border-green-100 font-medium transition-colors shadow"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditValues(bloodStock);
                  setEditMode(false);
                }}
                className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 border border-gray-200 font-medium transition-colors shadow"
              >
                Cancel
              </button>
            </div>
          )
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blood-red-600"></div>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-br from-blood-red-50 to-blood-red-100 rounded-2xl shadow-lg p-1 mb-8">
            <div className="bg-white rounded-xl shadow px-0 md:px-6 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
                {Object.entries(bloodStock).map(([bloodType, units]) => (
                  <div key={bloodType} className="bg-gradient-to-br from-gray-50 to-blood-red-50 border border-blood-red-50 rounded-lg shadow-sm p-4 flex flex-col items-center">
                    <span className="text-2xl font-bold text-blood-red-800">{bloodType}</span>
                    {!editMode ? (
                      <>
                        <div className="text-xl font-medium mt-1 text-gray-900">{units} units</div>
                        <div className={`mt-2 px-2 py-1 rounded text-xs font-medium ${getAvailabilityClass(units)}`}>
                          {getAvailabilityText(units)}
                        </div>
                      </>
                    ) : (
                      <div className="mt-3">
                        <input
                          type="number"
                          min="0"
                          value={editValues[bloodType]}
                          onChange={(e) => handleEditChange(bloodType, e.target.value)}
                          className="border border-gray-300 rounded px-3 py-1 text-center w-20 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blood-red-100"
                        />
                        <span className="ml-2 text-sm">units</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-1">
              <div className="bg-white rounded-xl shadow px-4 py-6">
                <div className="mb-3">
                  <h2 className="font-semibold text-lg text-green-900">Recent Activities</h2>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <p className="text-sm">Added 3 units of O+ blood</p>
                    <p className="text-xs text-gray-400">Today, 2:30 PM</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-3 py-1">
                    <p className="text-sm">Issued 2 units of AB- blood</p>
                    <p className="text-xs text-gray-400">Today, 11:15 AM</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3 py-1">
                    <p className="text-sm">Added 5 units of A+ blood</p>
                    <p className="text-xs text-gray-400">Yesterday, 4:45 PM</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-3 py-1">
                    <p className="text-sm">Marked 1 unit of B+ as expired</p>
                    <p className="text-xs text-gray-400">Yesterday, 9:20 AM</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-3 py-1">
                    <p className="text-sm">Issued 1 unit of O- blood</p>
                    <p className="text-xs text-gray-400">Nov 22, 3:10 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blood-red-50 rounded-2xl shadow-lg p-1">
              <div className="bg-white rounded-xl shadow px-4 py-6">
                <div className="mb-3">
                  <h2 className="font-semibold text-lg text-blue-900">Quick Actions</h2>
                </div>
                <div className="space-y-4">
                  <button
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg border border-blue-100 font-medium flex items-center justify-center shadow"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Record New Donation
                  </button>
                  <button
                    className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-lg border border-green-100 font-medium flex items-center justify-center shadow"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Generate Inventory Report
                  </button>
                  <button
                    className="w-full bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-2 px-4 rounded-lg border border-yellow-100 font-medium flex items-center justify-center shadow"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Check Expiring Units
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stock;
