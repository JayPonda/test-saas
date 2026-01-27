import express from 'express';
import { createSession, deleteSession } from '../controllers/SessionController.js';

const router = express.Router();

router.post('/', createSession);
router.delete('/:sessionId', deleteSession);

export default router;
