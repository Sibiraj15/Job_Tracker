
import mongoose from "mongoose";
import Job from "../models/Job.js";

// Get analytics for current user
export const getAnalytics = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id); // ✅ use 'new'
    // 1️⃣ Jobs by status
    const statusAggregation = await Job.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const statusData = statusAggregation.reduce(
      (acc, item) => {
        acc[item._id] = item.count;
        return acc;
      },
      { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 }
    );

    // 2️⃣ Jobs by company
    const companyAggregation = await Job.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: "$company_name", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // 3️⃣ Jobs by timeline (per month)
    const timelineAggregation = await Job.aggregate([
      { $match: { user_id: userId } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      byStatus: statusData,
      byCompany: companyAggregation,
      byTimeline: timelineAggregation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};