import mongoose from 'mongoose';


const requestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // custom ID like req-xxx
  requestedBy: { type: String, required: true },
  contactInfo: { type: String, required: true },
  patientName: { type: String, required: true },
  hospitalName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  units: { type: Number, required: true },
  urgency: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'completed', 'cancelled'], // ✅ restricted values
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now },
  assignedTo: { type: String, default: '' },
  donatedBy: { type: String, default: '' },
  completedAt: { type: Date },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  distance: { type: String, default: '' }
});

const Request = mongoose.model('Request', requestSchema);
export default Request;