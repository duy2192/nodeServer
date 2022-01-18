import CategoriesController from "../controllers/CategoriesController.js";
import  { Router } from "express"
import {authorization,authentication} from "../middlewares/authMiddleware"
const router=Router()
router.post("/",authentication,authorization,CategoriesController.create)
router.patch("/:categoryid",authentication,authorization,CategoriesController.update)
router.delete("/:categoryid",authentication,authorization,CategoriesController.delete)
router.get("/",CategoriesController.getAll)
router.get("/bymanuid/:manuid",CategoriesController.getByManuId)
router.get("/bymanuid/",CategoriesController.getByManuId)


export default router;
