import express from 'express';
import { getUserProfile,updateProfile } from '../controllers/userController.js';

const router = express.Router();

// Route: GET /api/user/:userId
router.get('/:userId', getUserProfile);
// Edit user profile
router.put('/:id', updateProfile);

export default router;
