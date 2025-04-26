
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BloodRequestForm from '../components/BloodRequestForm';
import BloodBankMap from '../components/BloodBankMap';
import { Button } from '../components/ui/button';

// Sleek hero image
const heroImg = "https://i.pinimg.com/736x/7b/87/0e/7b870e1666c621528377f27310937aec.jpg";

const Home = () => {
  const { userRole } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Mock data for blood banks
  const bloodBanks = [
    {
      id: 1,
      name: 'Prayag Blood Center',
      location: [25.4450752, 81.8499104],
      available: ['A+', 'O-', 'B+']
    },
    {
      id: 2,
      name: 'Red Cross Blood Bank Prayagraj',
      location: [25.4370752, 81.8459104],
      available: ['A-', 'B-', 'O+', 'AB+']
    },
    {
      id: 3,
      name: 'Sunrise Blood Bank',
      location: [25.4430752, 81.8519104],
      available: ['B+', 'O-', 'AB-']
    },
    {
      id: 4,
      name: 'LifeSaver Blood Bank',
      location: [25.4390752, 81.8439104],
      available: ['A+', 'B+', 'AB+']
    },
    {
      id: 5,
      name: 'Hope Blood Center',
      location: [25.4470752, 81.8539104],
      available: ['O+', 'O-', 'B-']
    }
  ];
  

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="bg-gradient-to-tl from-blood-red-50 via-white to-blood-red-100 min-h-[100vh]">
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center px-6 py-14 md:py-20 max-w-6xl mx-auto">
        <div className="flex-1 z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight" style={{letterSpacing: '0.0075em', fontFamily: "'Playfair Display', serif"}}>
            A <span className="text-blood-red-500">Single Drop</span> <br />
            Can Save a <span className="text-blood-red-600">Life.</span>
          </h1>
          <p className="text-gray-700 md:text-lg max-w-lg mb-9 leading-relaxed font-light">
            Join our community to make timely blood available for everyone in need. Minimal time, infinite impact.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border border-gray-200 bg-white/80 text-gray-700 hover:bg-blood-red-50/70 hover:text-blood-red-700 transition-shadow shadow-sm"
              onClick={() => window.location.href = '/auth/login'}
            >
              Login as Donor / Patient
            </Button>
            <Button
              className="bg-blood-red-100 text-blood-red-800 hover:bg-blood-red-200 hover:text-blood-red-900 shadow-sm transition-shadow font-medium"
              onClick={() => window.location.href = '/auth/register'}
            >
              Register as Blood Bank
            </Button>

          </div>
          
        </div>
        <div className="flex-1 flex justify-center z-10">
          <div className="relative">
            <img
              src={heroImg}
              alt="Blood donation illustration"
              className="rounded-3xl shadow-xl w-[340px] h-[280px] object-cover border-2 border-white/70"
              style={{ filter: "brightness(1.03) contrast(1.06)" }}
              draggable={false}
            />
            <div className="absolute right-[-30px] bottom-[-28px] w-28 h-28 bg-blood-red-100 rounded-full opacity-30 blur-xl z-0" />
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute left-[-7vw] top-[6vh] w-72 h-72 bg-blood-red-50 blur-2xl opacity-40 z-0"></div>
        <div className="absolute right-[-50px] top-0 w-48 h-48 bg-blood-red-100 blur-2xl opacity-20 z-0"></div>
      </section>

      <main className="container mx-auto px-4 pb-12">
      <div className="ml-3 pb-6 pt-3 flex ">
              <Button
                onClick={() => setShowRequestForm(true)}
                className="bg-blood-red-800 text-white hover:bg-blood-red-100 hover:text-blood-red-700 px-8 py-4 rounded-xl shadow transition-colors font-semibold"
              >
                Raise a Blood Request
              </Button>
            </div>
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Map + Banks */}
          <div className="lg:w-2/3 rounded-2xl bg-white/85 shadow-md p-0 backdrop-blur-xl">
            <div className="bg-blood-red-100/90 text-blood-red-800 rounded-t-2xl px-6 py-4 border-b border-blood-red-50">
              <h2 className="text-xl font-semibold">Nearby Blood Banks</h2>
              <p className="text-sm opacity-70">Find a blood bank close to you</p>
            </div>
            <div className="p-3 pb-0">
              <BloodBankMap 
                bloodBanks={bloodBanks} 
                onLocationSelect={handleLocationSelect}
                height="400px"
              />
            </div>
            
          </div>

          {/* Right column- Stats & Info */}
          <div className="lg:w-1/3 flex flex-col gap-8">
            {/* Blood Type Availability */}
            <div className="bg-white/85 rounded-2xl shadow-md overflow-hidden">
              <div className="bg-blood-red-100/80 text-blood-red-800 px-6 py-4 border-b border-blood-red-50">
                <h2 className="text-lg font-semibold">Blood Availability</h2>
                <p className="text-xs opacity-75">Across local blood banks</p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3">
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bloodType, i) => {
                    const available = Math.random() > 0.25;
                    return (
                      <div
                        key={bloodType}
                        className={`rounded-lg px-4 py-3 flex flex-col items-center transition-colors duration-150
                          ${available
                            ? "bg-green-50 border border-green-200"
                            : "bg-amber-50 border border-amber-200"}
                        `}
                      >
                        <div className={`text-lg font-bold ${available ? "text-green-600" : "text-amber-600"}`}>
                          {bloodType}
                        </div>
                        <div className={`text-xs mt-1 ${available ? "text-green-700" : "text-amber-700"}`}>
                          {available ? "Available" : "Limited"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Why Donate Card */}
            <div className="bg-white/85 rounded-2xl shadow-md overflow-hidden">
              <div className="bg-blood-red-100/80 text-blood-red-800 px-6 py-4 border-b border-blood-red-50">
                <h2 className="text-lg font-semibold">Why Donate Blood?</h2>
              </div>
              <div className="p-5">
                <ul className="space-y-2 text-[15px]">
                  <li className="flex items-center text-gray-700 gap-2">
                    <span className="w-4 text-green-500">
                      <svg width="18" height="18" fill="none" className="" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    </span>
                    One donation can save 3 lives
                  </li>
                  <li className="flex items-center text-gray-700 gap-2">
                    <span className="w-4 text-green-500">
                      <svg width="18" height="18" fill="none" className="" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    </span>
                    Blood can't be manufactured – it comes from donors
                  </li>
                  <li className="flex items-center text-gray-700 gap-2">
                    <span className="w-4 text-green-500">
                      <svg width="18" height="18" fill="none" className="" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    </span>
                    Every 2 seconds, someone needs blood
                  </li>
                </ul>
                {!userRole ? (
                  <Button 
                    className="mt-5 w-full bg-blood-red-50 text-blood-red-800 hover:bg-blood-red-100 font-normal"
                    onClick={() => window.location.href = '/auth/login'}
                  >
                    Login as Donor / Patient
                  </Button>
                ) : userRole !== 'donor' ? (
                  <Button 
                    className="mt-5 w-full bg-blood-red-50 text-blood-red-800 hover:bg-blood-red-100 font-normal"
                    onClick={() => window.location.href = '/auth/login'}
                  >
                    Login as Donor / Patient
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Blood Request Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in">
              <div className="bg-blood-red-100 text-blood-red-800 rounded-t-xl p-4 flex justify-between items-center">
                <h3 className="text-lg font-bold">Raise Blood Request</h3>
                <button 
                  onClick={() => setShowRequestForm(false)}
                  className="text-blood-red-700 hover:text-blood-red-900"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <BloodRequestForm 
                  selectedLocation={selectedLocation} 
                  onRequestSubmit={() => {
                    setShowRequestForm(false);
                    alert('Blood request submitted successfully!');
                  }} 
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

