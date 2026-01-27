import express from 'express';
import {
  getAllSubscriptionPayments,
  getSubscriptionPaymentById,
  createSubscriptionPayment,
} from '../controllers/SubscriptionPaymentController.js';

const router = express.Router();

router.get('/', getAllSubscriptionPayments);
router.get('/:id', getSubscriptionPaymentById);
router.post('/', createSubscriptionPayment);

export default router;
