import express from 'express';
import * as users from "../controllers/UserController.js";

const router = express.Router();

router.get("/", users.findAll);
router.get("/:id", users.findOne);

export default router;
