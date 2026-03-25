// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Load .env here as early as possible

// Ensure keys exist
if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
  throw new Error("Cloudinary keys are missing in .env");
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// Multer storage for file uploads
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "job-tracker-resumes",
    resource_type: "auto"
  }
});

export { cloudinary, storage }; // named exports