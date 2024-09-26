import { Router } from "express";
import { findProductById, getdata, userControllerworks } from "../Controllers/usercontroller.js";
import { loginCheck } from "../Controllers/authController.js";
const router = Router()
router.get('/', userControllerworks )
router.get("/data",loginCheck ,getdata)
router.get("/product/:id", findProductById)
export default router