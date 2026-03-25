// import jwt from "jsonwebtoken";

// export const protect = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log("Header:", req.headers.authorization);

//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Token failed" });
//     console.log("TOKEN:", token);
//   }
// };

import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ only store user id
    req.user = { id: decoded.id };

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};