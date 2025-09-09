import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";

// Load environment variables first
dotenv.config();
console.log("API Key loaded?", process.env.OPENAI_API_KEY ? " Yes" : " No");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
