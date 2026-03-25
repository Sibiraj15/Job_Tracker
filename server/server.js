import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("./.env") });


import app from "./app.js";
import connectDB from "./config/db.js";
import { scheduleReminders } from "./utils/reminderScheduler.js";

scheduleReminders();

const PORT = process.env.PORT || 5000;

// Connect MongoDB
connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

