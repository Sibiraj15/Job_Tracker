import Reminder from "../models/Reminder.js";
import Job from "../models/Job.js";
import { sendEmail } from "../config/nodemailer.js";

// CREATE REMINDER
export const createReminder = async (req, res) => {
  try {
    const { job_id, reminder_date, message } = req.body;

    const job = await Job.findOne({ _id: job_id, user_id: req.user.id });
    if (!job) return res.status(404).json({ message: "Job not found" });

    const reminder = await Reminder.create({
      job_id,
      user_id: req.user.id,
      reminder_date,
      message
    });

    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL REMINDERS
export const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user_id: req.user.id }).populate("job_id");
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE REMINDER
export const deleteReminder = async (req, res) => {
  try {
    await Reminder.findOneAndDelete({ _id: req.params.id, user_id: req.user.id });
    res.json({ message: "Reminder deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};