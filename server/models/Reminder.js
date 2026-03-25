import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    job_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    reminder_date: {
      type: Date,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    sent: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Reminder", reminderSchema);