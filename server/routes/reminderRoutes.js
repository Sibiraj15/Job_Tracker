import express from "express";
import {
  createReminder,
  getReminders,
  deleteReminder
} from "../controllers/reminderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getReminders);
router.post("/", createReminder);
router.delete("/:id", deleteReminder);

export default router;