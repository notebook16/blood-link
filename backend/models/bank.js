import mongoose from 'mongoose';

const bloodBankSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: false,
  },
  email: {  // unified email field
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  contactNumber: {
    type: String,
    required: false,
  },
  operatingHours: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
  },
  bankAddress: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['bloodbank'],
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
    default: ''
  }
  
});



const BloodBank = mongoose.model('BloodBank', bloodBankSchema);
export default BloodBank;
