// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";
// import morgan from "morgan";


// import authRoutes from "./routes/authRoutes.js";
// import jobRoutes from "./routes/jobRoutes.js";
// import reminderRoutes from "./routes/reminderRoutes.js";
// import analyticsRoutes from "./routes/analyticsRoutes.js";
// import exportRoutes from "./routes/exportRoutes.js";


// const app = express();

// // ✅ Body parser
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Security
// app.use(helmet());


// // ✅ Logging
// app.use(morgan("dev"));

// // ✅ CORS
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/reminders", reminderRoutes);
// app.use("/api/analytics", analyticsRoutes);
// app.use("/api/export", exportRoutes);

// export default app;


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";

const app = express();

// ✅ Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-tracker-nu-rouge.vercel.app",
].filter(Boolean);

// ✅ CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / mobile apps / requests without origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Security
app.use(helmet());

// ✅ Logging
app.use(morgan("dev"));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/export", exportRoutes);

export default app;