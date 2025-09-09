import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";

// Load environment variables first
dotenv.config();
console.log(
  "API Key loaded?",
  process.env.OPENAI_API_KEY ? "Yes" : "No"
);

const app = express();

// ✅ Enable CORS for frontend
// Use '*' for all origins (development)
// Replace '*' with your frontend URL for production
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
