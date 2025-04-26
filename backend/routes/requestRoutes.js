import express from 'express';
import { getAllRequests, updateRequestStatus, createRequest , getAllRequestsById } from '../controllers/requestController.js';

const router = express.Router();

router.get('/requests', getAllRequests);
router.put('/requests/update', updateRequestStatus);
router.post('/requests/:id', createRequest);
router.get('/requests/:id', getAllRequestsById);

export default router;
