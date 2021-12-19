import { Router } from "express";
import ProductController from"../controllers/ProductController.js";
const router=Router()
import {authorization,authentication} from "../middlewares/authMiddleware"

router.post("/",authentication,authorization,ProductController.create)
router.patch("/:productid",authentication,authorization,ProductController.update)
router.get("/",ProductController.getAll)
router.get("/:productid",ProductController.get)
router.delete("/:productid",authentication,authorization,ProductController.delete)


export default router;
