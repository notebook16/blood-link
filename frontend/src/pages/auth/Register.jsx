
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import axios from 'axios'; // ✅ correct



const Register = () => {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [userType, setUserType] = useState('donor_patient'); // 'donor_patient' or 'blood_bank'
  const [userId, setUserId] = useState(''); // New user ID state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let payload = {};
  
      if (userType === 'donor_patient') {
        if (password !== confirmPassword) return alert("Passwords don't match");
       

  
        payload = {
          role: 'donor',
          name,
          email,
          contactNumber, // Add this to payload
          userId, // Add this to payload
          bloodGroup,
          password,
          confirmPassword
        };
      } else if (userType === 'blood_bank') {
        // if (bankPassword !== bankConfirmPassword) return alert("Passwords don't match");
  
        payload = {
          role: 'bloodbank',
          bankName,
          email,
          license,
          bankAddress,
          password,
          contactNumber, // Add this to payload
          userId, // Add this to payload
        };
      }
  
      const res = await axios.post(`${serverUrl}/api/register`, payload);
      alert('Registered successfully!');
      console.log(res.data);
      navigate('/auth/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('Registration failed!');
    }
  };
  



  // Donor/Patient fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState(''); // New contact number state
  

  // Blood Bank fields
  const [bankName, setBankName] = useState('');
  const [license, setLicense] = useState('');
  const [bankAddress, setBankAddress] = useState('');

  const [bankConfirmPassword, setBankConfirmPassword] = useState('');

  

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blood-red-100 to-pink-50 text-blood-red-900 p-7">
          <div className="flex justify-center mb-4">
            <Button
              type="button"
              variant={userType === 'donor_patient' ? "default" : "outline"}
              className={`rounded-l-lg px-4 py-1 ${userType === 'donor_patient' ? "bg-blood-red-600 text-white" : ""}`}
              onClick={() => setUserType('donor_patient')}
            >
              Donor/Patient
            </Button>
            <Button
              type="button"
              variant={userType === 'blood_bank' ? "default" : "outline"}
              className={`rounded-r-lg px-4 py-1 ${userType === 'blood_bank' ? "bg-blood-red-600 text-white" : ""}`}
              onClick={() => setUserType('blood_bank')}
            >
              Blood Bank
            </Button>
          </div>
          <h2 className="text-2xl font-bold text-center mb-1">
            {userType === 'donor_patient' ? 'Register as Donor or Patient' : 'Register Blood Bank'}
          </h2>
          <p className="text-sm text-blood-red-800 text-center">
            {userType === 'donor_patient'
              ? 'Complete the form to register as a donor or patient and join BloodLink.'
              : 'Complete the form to register your blood bank on BloodLink.'}
          </p>
        </div>
        <div className="p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {userType === 'donor_patient' ? (
              <>
                <div>
                  <Label htmlFor="name" className="block text-gray-700 mb-1">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your name"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="block text-gray-700 mb-1">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your@email.com"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
                <div>
            <Label htmlFor="contactNumber" className="block text-gray-700 mb-1">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              placeholder="Enter your contact number"
              className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="userId" className="block text-gray-700 mb-1">
              User ID
            </Label>
            <Input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              placeholder="Enter a unique User ID"
              className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
            />
          </div>
                
                <div>
                  <Label htmlFor="bloodGroup" className="block text-gray-700 mb-1">
                    Blood Group
                  </Label>
                  <Input
                    id="bloodGroup"
                    type="text"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                    placeholder="e.g. A+, B-, O+"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="block text-gray-700 mb-1">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Create password"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm password"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="bankName" className="block text-gray-700 mb-1">
                    Blood Bank Name
                  </Label>
                  <Input
                    id="bankName"
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    required
                    placeholder="Enter blood bank name"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
                <div>
            <Label htmlFor="userId" className="block text-gray-700 mb-1">
              User ID
            </Label>
            <Input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
              placeholder="Enter a unique User ID"
              className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <Label htmlFor="contactNumber" className="block text-gray-700 mb-1">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
              placeholder="Enter your contact number"
              className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
            />
          </div>
          
          
                <div>
                  <Label htmlFor="email" className="block text-gray-700 mb-1">
                    Bank Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="bank@email.com"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="license" className="block text-gray-700 mb-1">
                    License Number
                  </Label>
                  <Input
                    id="license"
                    type="text"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    required
                    placeholder="Enter license number"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="bankAddress" className="block text-gray-700 mb-1">
                    Address
                  </Label>
                  <Input
                    id="bankAddress"
                    type="text"
                    value={bankAddress}
                    onChange={(e) => setBankAddress(e.target.value)}
                    required
                    placeholder="Enter address"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="block text-gray-700 mb-1">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Create password"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
                <div>
                  <Label htmlFor="bankConfirmPassword" className="block text-gray-700 mb-1">
                    Confirm Password
                  </Label>
                  <Input
                    id="bankConfirmPassword"
                    type="password"
                    value={bankConfirmPassword}
                    onChange={(e) => setBankConfirmPassword(e.target.value)}
                    required
                    placeholder="Confirm password"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>
              </>
            )}
            <Button
              type="submit"
              className="w-full bg-blood-red-600 text-white hover:bg-blood-red-700 rounded-md font-semibold py-2 transition-colors"
            >
              Register
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            {userType === "donor_patient" ? (
              <>
                <span className="text-gray-600">Want to register your blood bank?</span>{' '}
                <button
                  className="text-blood-red-700 hover:underline font-medium"
                  onClick={() => setUserType('blood_bank')}
                  type="button"
                >
                  Register as Blood Bank
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-600">Already registered?</span>{' '}
                <button
                  className="text-blood-red-700 hover:underline font-medium"
                  onClick={() => setUserType('donor_patient')}
                  type="button"
                >
                  Register as Donor/Patient
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
