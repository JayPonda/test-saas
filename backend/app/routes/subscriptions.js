import express from 'express';
import {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from '../controllers/SubscriptionController.js';
import { authenticateSession } from '../middleware/authenticateSession.js';

const router = express.Router();

router.get('/', authenticateSession, getAllSubscriptions);
router.get('/:id', authenticateSession, getSubscriptionById);
router.post('/', authenticateSession, createSubscription);
router.put('/:id', authenticateSession, updateSubscription);
router.delete('/:id', authenticateSession, deleteSubscription);

export default router;
