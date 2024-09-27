import { Router } from "express";
import { loginCheck } from "../Controllers/authController.js";
import { uploadMiddleware } from "../Controllers/imageUploader.js";
import { createPost } from "../Controllers/adminCintroler.js";
const router = Router()
router.post("/data",loginCheck,uploadMiddleware ,createPost)

export default router