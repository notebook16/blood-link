import mongoose from 'mongoose';

const donorPatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: ''
  },
  email: {  // unified email field
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    default: ''
  },
  password: {
    type: String,
    required: true,
    default: ''
  },
  confirmPassword: {
    type: String,
    required: false,
    default: ''
  },
  role: {
    type: String,
    enum: ['donor', 'patient'],
    required: true,
    default: 'donor'
  },
  contactNumber: {
    type: String,
    required: true,
    unique: true,
    default: ''
  },
  address: {
    type: String,
    required: false,
    default: ''
  },
  bloodGroup: {
    type: String,
    required: true,
    default: ''
  },
  aadhaarNumber: {
    type: String,
    required: false,
    unique: false,
    default: ''
  },
  medicalConditions: {
    type: String,
    required: false,
    default: ''
  },
  emergencyContact: {
    type: String,
    required: false,
    default: ''
  },
  lastDonationDate: {
    type: Date,
    required: false,
    default: null
  },
  donationCount: {
    type: Number,
    required: false,
    default: 0
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    default: ''
  }
}, {
  timestamps: true
});

const DonorPatient = mongoose.model('DonorPatient', donorPatientSchema);
export default DonorPatient;
