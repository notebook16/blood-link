import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Requests = () => {
  const { userRole } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchRequests = () => {
      setLoading(true);
      setTimeout(() => {
        const mockRequests = [
          {
            id: 'req-001',
            patientName: 'Sarah Johnson',
            hospitalName: 'City General Hospital',
            bloodGroup: 'O+',
            units: 2,
            urgency: 'critical',
            status: 'pending',
            createdAt: '2023-11-15T10:30:00',
            location: { lat: 51.505, lng: -0.09 },
            distance: '2.5 km',
          },
          {
            id: 'req-002',
            patientName: 'Michael Brown',
            hospitalName: 'St. Mary Medical Center',
            bloodGroup: 'A-',
            units: 1,
            urgency: 'urgent',
            status: 'assigned',
            createdAt: '2023-11-14T16:45:00',
            assignedTo: 'East District Blood Bank',
            location: { lat: 51.51, lng: -0.1 },
            distance: '3.8 km',
          },
          {
            id: 'req-003',
            patientName: 'Robert Wilson',
            hospitalName: 'Community Health Hospital',
            bloodGroup: 'B+',
            units: 3,
            urgency: 'normal',
            status: 'completed',
            createdAt: '2023-11-12T09:15:00',
            assignedTo: 'City Central Blood Bank',
            donatedBy: 'John Donor',
            completedAt: '2023-11-12T14:30:00',
            location: { lat: 51.5, lng: -0.08 },
            distance: '1.2 km',
          },
          {
            id: 'req-004',
            patientName: 'Emily Davis',
            hospitalName: 'University Medical Center',
            bloodGroup: 'AB+',
            units: 2,
            urgency: 'urgent',
            status: 'assigned',
            createdAt: '2023-11-13T11:20:00',
            assignedTo: 'City Central Blood Bank',
            location: { lat: 51.49, lng: -0.12 },
            distance: '4.0 km',
          },
          {
            id: 'req-005',
            patientName: 'James Miller',
            hospitalName: 'Mercy Hospital',
            bloodGroup: 'O-',
            units: 1,
            urgency: 'critical',
            status: 'pending',
            createdAt: '2023-11-15T08:10:00',
            location: { lat: 51.52, lng: -0.07 },
            distance: '5.2 km',
          },
        ];
        
        setRequests(mockRequests);
        setLoading(false);
      }, 800);
    };
    
    fetchRequests();
  }, [userRole]);
  
  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'urgent':
        return 'bg-orange-100 text-orange-800';
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleAction = (requestId, action) => {
    console.log(`Performing ${action} on request ${requestId}`);
    if (action === 'accept') {
      setRequests(
        requests.map(req =>
          req.id === requestId ? { ...req, status: 'assigned', assignedTo: 'Your Blood Bank' } : req
        )
      );
    } else if (action === 'complete') {
      setRequests(
        requests.map(req =>
          req.id === requestId ? { ...req, status: 'completed', completedAt: new Date().toISOString() } : req
        )
      );
    } else if (action === 'volunteer') {
      alert('Thank you for volunteering! The blood bank will contact you shortly.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 text-blood-red-800">
          {userRole === 'bloodbank' 
            ? 'Blood Requests' 
            : userRole === 'donor' 
            ? 'Donation Opportunities' 
            : 'My Blood Requests'}
        </h1>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${
              filter === 'all' 
                ? 'bg-blood-red-600 text-white border-blood-red-500 shadow'
                : 'bg-gray-100 hover:bg-blood-red-50 text-gray-700 border-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${
              filter === 'pending'
                ? 'bg-blood-red-600 text-white border-blood-red-500 shadow'
                : 'bg-gray-100 hover:bg-blood-red-50 text-gray-700 border-gray-200'
            }`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${
              filter === 'assigned'
                ? 'bg-blood-red-600 text-white border-blood-red-500 shadow'
                : 'bg-gray-100 hover:bg-blood-red-50 text-gray-700 border-gray-200'
            }`}
            onClick={() => setFilter('assigned')}
          >
            Assigned
          </button>
          <button
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${
              filter === 'completed'
                ? 'bg-blood-red-600 text-white border-blood-red-500 shadow'
                : 'bg-gray-100 hover:bg-blood-red-50 text-gray-700 border-gray-200'
            }`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-gradient-to-br from-blood-red-50 to-blood-red-100 rounded-2xl p-1 shadow-lg">
              <div className="bg-white rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
                <div className="p-5 border-b border-blood-red-50">
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-blood-red-200 text-blood-red-800 text-lg font-bold px-3 py-1 rounded shadow">
                      {request.bloodGroup}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusClass(request.status)} shadow`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`inline-block text-xs px-2 py-1 rounded ${getUrgencyClass(request.urgency)} shadow`}>
                      {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                    </span>
                    <span className="text-xs text-gray-400">{request.distance}</span>
                  </div>
                  <h3 className="font-bold mt-3 text-blood-red-800">{request.patientName}</h3>
                  <p className="text-sm text-gray-500 mb-2">{request.hospitalName}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <div>
                      <span className="font-semibold">Units:</span> {request.units}
                    </div>
                    <div>
                      <span className="font-semibold">Distance:</span> {request.distance}
                    </div>
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
                  {request.status === 'assigned' && userRole === 'bloodbank' && (
                    <button
                      onClick={() => handleAction(request.id, 'complete')}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium shadow transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}
                  {request.status === 'assigned' && userRole === 'donor' && (
                    <button
                      onClick={() => handleAction(request.id, 'volunteer')}
                      className="w-full bg-blood-red-600 text-white py-2 rounded-lg hover:bg-blood-red-700 font-medium shadow transition-colors"
                    >
                      Volunteer to Donate
                    </button>
                  )}
                  {(request.status === 'completed' || (userRole === 'patient')) && (
                    <div className="text-gray-400 text-center py-2 mt-2">
                      {request.status === 'completed' 
                        ? `Completed on ${new Date(request.completedAt).toLocaleDateString()}`
                        : userRole === 'patient' && request.status === 'pending'
                          ? 'Waiting for blood bank assignment'
                          : 'Assigned to blood bank'}
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
