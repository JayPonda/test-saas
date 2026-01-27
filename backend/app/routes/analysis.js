import express from 'express';
import {
  monthlyRecurringRevenue,
  oneTimePaymentRevenue,
  refunds,
  funnel,
} from '../controllers/AnalysisController.js';
import { authenticateSession } from '../middleware/authenticateSession.js';

const router = express.Router();

router.get('/monthly-recurring-revenue', authenticateSession, monthlyRecurringRevenue);
router.get('/one-time-payment-revenue', authenticateSession, oneTimePaymentRevenue);
router.get('/refunds', authenticateSession, refunds);
router.get('/funnel', authenticateSession, funnel);

export default router;
