import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique ID
import Request from '../models/Request.js';

export const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({}).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching all requests', error: err });
  }
};

export const getAllRequestsById = async (req, res) => {
  try {
    const userID = req.params.id;
    console.log(`got card by id at backend ${userID}`)
    const requests = await Request.find({ requestedBy: userID }).sort({ createdAt: -1 });

    if (!requests || requests.length === 0) {
      return res.status(200).json([]); // ✅ safer to send empty array instead of 404
    }

    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching requests by ID', error: err });
  }
};

export const updateRequestStatus = async (req, res) => {
 
  const { id, status, donatedBy, completedAt,assignedTo , bankAddress } = req.body;
  console.log(`Updating request at backend:`);
  console.log(`ID: ${id}`);
  console.log(`Status: ${status}`);
  console.log(`donated BY: ${donatedBy}`);
  console.log(`assigned to: ${assignedTo}`);
  console.log(`Completed At: ${completedAt}`);
  console.log(`bankAddress: ${bankAddress}`);
  

  if (!id || !status) {
    return res.status(400).json({ message: 'ID and Status are required' });
  }

  try {
    const updated = await Request.findOneAndUpdate(
      { id },
      {
        status,
        ...(donatedBy && { donatedBy }),
        ...(assignedTo && { assignedTo }),
        ...(completedAt && { completedAt }),
        ...(bankAddress && { bankAddress })

      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Request not found for update' });
    }

    res.status(200).json({ message: 'Request updated successfully', updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating request status', error: err });
  }
};

export const createRequest = async (req, res) => {
  try {
    const { patientName, hospitalName, bloodGroup, units, urgency, contactNumber, location } = req.body;
    const requestID = req.params.id;

    if (!patientName || !hospitalName || !bloodGroup || !units || !urgency || !contactNumber) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const uniqueID = `req-${uuidv4()}`;

    const newRequest = new Request({
      id: uniqueID,
      requestedBy: requestID,
      contactInfo: contactNumber,
      patientName,
      hospitalName,
      bloodGroup,
      units,
      urgency,
      location
    });

    await newRequest.save();
    console.log(newRequest)

    res.status(201).json({
      message: 'Blood request created successfully',
      request: newRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating blood request', error });
  }
};
