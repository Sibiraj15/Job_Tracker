import Job from "../models/Job.js";
import { cloudinary } from "../config/cloudinary.js"; // ✅ named import


// export const createJob = async (req, res) => {
//   try {
//     let resumeUrl = "";

//     if (req.file) {
//       const result = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "job-tracker-resumes", resource_type: "auto" },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );
//         stream.end(req.file.buffer);
//       });

//       resumeUrl = result.secure_url;
//     }

//     const job = await Job.create({
//       ...req.body,
//       resume_url: resumeUrl,
//       user_id: req.user.id
//     });

//     res.status(201).json(job);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };



export const createJob = async (req, res) => {
  try {
    let resumeUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "job-tracker-resumes", resource_type: "raw" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      resumeUrl = result.secure_url;
    }

    const notes = req.body.notes ? JSON.parse(req.body.notes) : [];
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    const job = await Job.create({
      company_name: req.body.company_name,
      role: req.body.role,
      status: req.body.status || "Applied",
      notes,
      tags,
      resume_url: resumeUrl,
      user_id: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET JOBS
export const getJobs = async (req, res) => {
  try {
    const { status, search, tag } = req.query;

    let query = { user_id: req.user.id };

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { company_name: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } }
      ];
    }

    if (tag) query.tags = tag;

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
// export const updateJob = async (req, res) => {
//   try {
//     const job = await Job.findOneAndUpdate(
//       { _id: req.params.id, user_id: req.user.id },
//       req.body,
//       { new: true }
//     );

//     res.json(job);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateJob = async (req, res) => {
//   try {
//     let updateData = { ...req.body };

//     if (req.body.notes) {
//       updateData.notes = JSON.parse(req.body.notes);
//     }

//     if (req.body.tags) {
//       updateData.tags = JSON.parse(req.body.tags);
//     }

//     const job = await Job.findOneAndUpdate(
//       { _id: req.params.id, user_id: req.user.id },
//       updateData,
//       { new: true }
//     );

//     res.json(job);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateJob = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.body.notes) {
      updateData.notes = JSON.parse(req.body.notes);
    }

    if (req.body.tags) {
      updateData.tags = JSON.parse(req.body.tags);
    }

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "job-tracker-resumes", resource_type: "raw" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      updateData.resume_url = result.secure_url;
    }

    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      updateData,
      { new: true }
    );

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteJob = async (req, res) => {
  try {
    await Job.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id
    });

    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE JOB STATUS (for Kanban drag-and-drop)
export const updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const VALID_STATUSES = ["Applied", "Interview", "Offer", "Rejected"];
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const job = await Job.findOne({ _id: id, user_id: req.user.id });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.status = status;
    await job.save();

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};