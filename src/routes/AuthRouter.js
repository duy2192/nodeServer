import { Router } from "express";
import UserController  from "../controllers/UserController.js";
const router=Router()
router.post("/login",UserController.login)
router.post("/register",UserController.register)

export default router;
