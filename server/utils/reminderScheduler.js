import cron from "node-cron";
import Reminder from "../models/Reminder.js";
import User from "../models/User.js";
import { sendEmail } from "../config/nodemailer.js";

export const scheduleReminders = () => {
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    const reminders = await Reminder.find({
      reminder_date: { $lte: now },
      sent: false
    }).populate("user_id job_id");

    for (const reminder of reminders) {
      try {
        await sendEmail(
          reminder.user_id.email,
          `Job Reminder: ${reminder.job_id.role}`,
          reminder.message
        );
        reminder.sent = true;
        await reminder.save();
      } catch (error) {
        console.error("Error sending reminder:", error);
      }
    }
  });
};