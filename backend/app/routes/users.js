import express from 'express';
import * as users from "../controllers/UserController.js";
import { authenticateSession } from '../middleware/authenticateSession.js';

const router = express.Router();

router.get("/", authenticateSession, users.findAll);
router.get("/:id", authenticateSession, users.findOne);

export default router;
