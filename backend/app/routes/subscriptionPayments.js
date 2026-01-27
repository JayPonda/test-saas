import express from 'express';
import {
  getAllSubscriptionPayments,
  getSubscriptionPaymentById,
  createSubscriptionPayment,
} from '../controllers/SubscriptionPaymentController.js';
import { authenticateSession } from '../middleware/authenticateSession.js';

const router = express.Router();

router.get('/', authenticateSession, getAllSubscriptionPayments);
router.get('/:id', authenticateSession, getSubscriptionPaymentById);
router.post('/', authenticateSession, createSubscriptionPayment);

export default router;
