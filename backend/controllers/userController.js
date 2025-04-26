import DonorPatient from '../models/user.js';
import BloodBank from '../models/bank.js';  // Model for blood banks

// GET /api/user/profile/:userId
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.query;  // 'bloodbank', 'donor', or 'patient'
    console.log(`Fetching profile for ${role} with ID: ${userId}`);

    let user;
    if (role === 'bloodbank') {
      user = await BloodBank.findOne({ userId }).select('-password -confirmPassword');
    } else {
      user = await DonorPatient.findOne({ userId }).select('-password -confirmPassword');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/user/profile/:userId
export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    const { role } = req.query;


    console.log(`Updating profile for ${role} with ID: ${userId}`, updates);

    let updated;
    if (role === 'bloodbank') {
      updated = await BloodBank.findOneAndUpdate(
        { userId },
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-password -confirmPassword').lean();
    } else {
      updated = await DonorPatient.findOneAndUpdate(
        { userId },
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-password -confirmPassword').lean();
    }

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};
