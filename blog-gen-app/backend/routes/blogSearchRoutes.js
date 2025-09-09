import express from "express";
import { saveBlog, searchBlogs } from "../controllers/blogSearchController.js";

const router = express.Router();

router.post("/save", saveBlog);
router.get("/search", searchBlogs);

export default router;
