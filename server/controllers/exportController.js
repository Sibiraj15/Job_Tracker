import { Parser } from "json2csv";
import PDFDocument from "pdfkit";
import Job from "../models/Job.js";
import mongoose from "mongoose";

// Export jobs as CSV
export const exportCSV = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const jobs = await Job.find({ user_id: userId }).lean();

    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found to export" });
    }

    const fields = ["company_name", "role", "status", "notes", "tags", "resume_url", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(jobs);

    res.header("Content-Type", "text/csv");
    res.attachment("jobs_export.csv");
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Export jobs as PDF
export const exportPDF = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const jobs = await Job.find({ user_id: userId }).lean();

    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found to export" });
    }

    const doc = new PDFDocument({ margin: 30, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=jobs_export.pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Job Tracker Export", { align: "center" });
    doc.moveDown();

    jobs.forEach((job, i) => {
      doc.fontSize(12).text(`${i + 1}. Company: ${job.company_name}`);
      doc.text(`   Role: ${job.role}`);
      doc.text(`   Status: ${job.status}`);
      doc.text(`   Notes: ${job.notes.join(", ")}`);
      doc.text(`   Tags: ${job.tags.join(", ")}`);
      doc.text(`   Resume: ${job.resume_url}`);
      doc.text(`   Created At: ${new Date(job.createdAt).toLocaleString()}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};