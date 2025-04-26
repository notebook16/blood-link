import DonorPatient from '../models/user.js';

// GET user profile by userId
export const getUserProfile = async (req, res) => {
    try {
      const { userId } = req.params;  // Correct way to access params
      console.log(`get user profile ${userId}`)
  
      const user = await DonorPatient.findOne({ userId }).select('-password -confirmPassword');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// PUT /api/user/profile/:id
export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    // Find and update by userId
    const user = await DonorPatient.findOneAndUpdate(
      { userId: id },
      { $set: updates },
      { new: true, runValidators: true }
    ).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
