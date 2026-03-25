import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    company_name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
      index: true
    },
    notes: [String],
    tags: [{ type: String, index: true }],
    resume_url: String
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);