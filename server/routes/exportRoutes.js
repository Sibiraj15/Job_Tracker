import express from "express";
import { exportCSV, exportPDF } from "../controllers/exportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // JWT protected

router.get("/csv", exportCSV);
router.get("/pdf", exportPDF);

export default router;