import { Router } from "express";
import { loginCheck } from "../Controllers/authController.js";
import { uploadMiddleware } from "../Controllers/imageUploader.js";
import { createPost, deletePost } from "../Controllers/adminCintroler.js";
const router = Router()
router.post("/data",loginCheck,uploadMiddleware ,createPost)
router.delete("/data/:id",deletePost)

export default router