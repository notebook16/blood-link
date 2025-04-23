
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const Login = () => {
  const [userType, setUserType] = useState('donor_patient'); // 'donor_patient' or 'blood_bank'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bankEmail, setBankEmail] = useState('');
  const [bankPassword, setBankPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You may add more auth logic here based on userType
    login();
    navigate('/');
  };

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
            {userType === 'donor_patient' ? 'Login as Donor or Patient' : 'Login as Blood Bank'}
          </h2>
          <p className="text-sm text-blood-red-800 text-center">
            {userType === 'donor_patient'
              ? 'Please log in to access your Donor or Patient dashboard.'
              : 'Blood bank staff: log in to your BloodLink bank dashboard.'}
          </p>
        </div>
        <div className="p-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            {userType === 'donor_patient' ? (
              <>
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
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md focus:ring-2 focus:ring-blood-red-100 transition"
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
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md focus:ring-2 focus:ring-blood-red-100 transition"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="bankEmail" className="block text-gray-700 mb-1">
                    Bank Email
                  </Label>
                  <Input
                    id="bankEmail"
                    type="email"
                    value={bankEmail}
                    onChange={(e) => setBankEmail(e.target.value)}
                    required
                    placeholder="bank@email.com"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md focus:ring-2 focus:ring-blood-red-100 transition"
                  />
                </div>
                <div>
                  <Label htmlFor="bankPassword" className="block text-gray-700 mb-1">
                    Password
                  </Label>
                  <Input
                    id="bankPassword"
                    type="password"
                    value={bankPassword}
                    onChange={(e) => setBankPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-md focus:ring-2 focus:ring-blood-red-100 transition"
                  />
                </div>
              </>
            )}
            <Button
              type="submit"
              className="w-full bg-blood-red-600 text-white hover:bg-blood-red-700 rounded-md font-semibold py-2 transition-colors"
            >
              Login
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            {userType === 'donor_patient' ? (
              <>
                <span className="text-gray-600">Blood Bank?</span>{' '}
                <button
                  className="text-blood-red-700 hover:underline font-medium"
                  onClick={() => setUserType('blood_bank')}
                  type="button"
                >
                  Login as Blood Bank
                </button>
              </>
            ) : (
              <>
                <span className="text-gray-600">Donor/Patient?</span>{' '}
                <button
                  className="text-blood-red-700 hover:underline font-medium"
                  onClick={() => setUserType('donor_patient')}
                  type="button"
                >
                  Login as Donor/Patient
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
