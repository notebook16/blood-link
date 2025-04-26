import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Requests = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const { userRole } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [myRequestsOnly, setMyRequestsOnly] = useState(false);
  const [requestID, setRequestID] = useState('');
  const [bankName , setBankName] = useState('');



  // Fetch function extracted to be re-used
  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (myRequestsOnly && requestID && userRole === 'donor') {
        res = await axios.get(`${serverUrl}/api/requests/${requestID}`);
      } else {
        res = await axios.get(`${serverUrl}/api/requests`);
      }
      setRequests(res.data);
    } catch (error) {
      console.error('Failed to fetch requests', error);
    } finally {
      setLoading(false);
    }
  }, [myRequestsOnly, requestID, userRole]);

  // Initial load of stored user ID
  useEffect(() => {
    const storedRequestID = localStorage.getItem('userIdx');
    setRequestID(storedRequestID);
    
  const localBankName = localStorage.getItem('localBank');
  console.log(` bank name ${localBankName}`);
  setBankName(localBankName)
  }, []);

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Helpers
  const capitalize = (value, fallback = '') =>
    typeof value === 'string' && value
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : fallback;

  const safeNumber = (value, fallback = 'N/A') => {
    const num = typeof value === 'string' ? Number(value) : value;
    return typeof num === 'number' && !isNaN(num) ? num : fallback;
  };

  // Filtered requests based on UI filter
  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  const getStatusClass = status => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-purple-100 text-purple-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyClass = urgency => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'urgent': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Handle status updates and refetch
  const handleAction = async (requestId, action) => {
    const updatePayload = { id: requestId };
    if (action === 'accept') {
      updatePayload.status = 'accepted';
      updatePayload.assignedTo = bankName;
    } else if (action === 'volunteer') {
      updatePayload.status = 'assigned';
      updatePayload.donatedBy = requestID;
    } else if (action === 'complete') {
      updatePayload.status = 'completed';
      updatePayload.completedAt = new Date().toISOString();
    }

    try {
      await axios.put(`${serverUrl}/api/requests/update`, updatePayload);
      // Refetch fresh data
      await fetchRequests();
      // Switch UI filter to show updated card
      setFilter(updatePayload.status);
    } catch (error) {
      console.error('Failed to update request status', error);
    }
  };

  

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      {/* Header and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 text-blood-red-800">
          {userRole === 'bloodbank'
            ? 'Blood Requests'
            : userRole === 'donor'
            ? 'Donation Opportunities'
            : 'My Blood Requests'}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div className="flex space-x-2">
            {['all', 'pending', 'accepted', 'assigned', 'completed'].map(status => (
              <button
                key={status}
                className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${
                  filter === status
                    ? 'bg-blood-red-600 text-white border-blood-red-500 shadow'
                    : 'bg-gray-100 hover:bg-blood-red-50 text-gray-700 border-gray-200'
                }`}
                onClick={() => setFilter(status)}
              >
                {capitalize(status, status === 'all' ? 'All' : capitalize(status))}
              </button>
            ))}
          </div>
          <label className="flex items-center space-x-2 ml-2 text-sm text-gray-700 mt-2 md:mt-0">
            <input
              type="checkbox"
              checked={myRequestsOnly}
              onChange={() => setMyRequestsOnly(!myRequestsOnly)}
              className="accent-blood-red-600"
            />
            <span>My Requests Only</span>
          </label>
        </div>
      </div>

      {/* Loading and No Data States */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blood-red-600"></div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center border border-blood-red-50">
          <div className="text-gray-500 mb-2">No blood requests found</div>
          {userRole === 'patient' && (
            <button
              onClick={() => window.location.href = '/'}
              className="mt-2 bg-blood-red-600 hover:bg-blood-red-700 text-white py-2 px-6 rounded-lg font-medium transition-colors shadow"
            >
              Create New Request
            </button>
          )}
        </div>
      ) : (
        /* Requests Grid */
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map(request => (
            <div key={request.id} className="bg-gradient-to-br from-blood-red-50 to-blood-red-100 rounded-2xl p-1 shadow-lg">
              <div className="bg-white rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
                <div className="p-5 border-b border-blood-red-50">
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-blood-red-200 text-blood-red-800 text-lg font-bold px-3 py-1 rounded shadow">
                      {request.bloodGroup}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusClass(request.status)} shadow`}>
                      {capitalize(request.status)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`inline-block text-xs px-2 py-1 rounded ${getUrgencyClass(request.urgency)} shadow`}>
                      {capitalize(request.urgency)}
                    </span>
                    <span className="text-xs text-gray-400">{safeNumber(request.distance)} km</span>
                  </div>
                  <h3 className="font-bold mt-3 text-blood-red-800">patient: {request.patientName}</h3>
                  <p className="text-sm text-gray-500 mb-2"> {request.hospitalName}</p>
                  <div className="grid grid-row-2 gap-2 text-xs text-gray-500">
                    <div><span className="font-semibold">Units:</span> {safeNumber(request.units)}</div>
                    <div><span className="font-semibold">accepted by bank :</span> {(request.assignedTo)}</div>
                    <div><span className="font-semibold">volunteer by:</span> {(request.donatedBy)}</div>
                    
                  </div>
                </div>
                <div className="bg-gray-50 p-4 text-sm flex-1 flex flex-col justify-end">
                  {request.status === 'pending' && userRole === 'bloodbank' && (
                    <button
                      onClick={() => handleAction(request.id, 'accept')}
                      className="w-full bg-blood-red-600 text-white py-2 rounded-lg hover:bg-blood-red-700 font-medium shadow transition-colors"
                    >
                      Accept Request
                    </button>
                  )}
                  {request.status === 'accepted' && userRole === 'donor' && (
                    <button
                      onClick={() => handleAction(request.id, 'volunteer')}
                      className="w-full bg-blood-red-600 text-white py-2 rounded-lg hover:bg-blood-red-700 font-medium shadow transition-colors"
                    >
                      Volunteer to Donate
                    </button>
                  )}
                  {request.status === 'assigned' && userRole === 'bloodbank' && (
                    <button
                      onClick={() => handleAction(request.id, 'complete')}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium shadow transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                  {(request.status === 'completed' || userRole === 'patient') && (
                    <div className="text-gray-400 text-center py-2 mt-2">
                      {request.status === 'completed'
                        ? `Completed on ${new Date(request.completedAt).toLocaleDateString()}`
                        : 'Waiting for blood bank assignment'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
