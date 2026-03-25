import express from "express";
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  updateJobStatus
} from "../controllers/jobController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.use(protect);

router.post("/", upload.single("resume"), createJob);
router.get("/", getJobs);
router.put("/:id", protect, upload.single("resume"), updateJob);
router.delete("/:id", deleteJob);
router.put("/status/:id", updateJobStatus);

export default router;