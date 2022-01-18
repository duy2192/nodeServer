import ManufacturerController from "../controllers/ManufacturerController.js";
import {Router} from "express"
import {authorization,authentication} from "../middlewares/authMiddleware"

const router=Router()
router.post("/",authentication,authorization,ManufacturerController.create)
router.patch("/:manuid",authentication,authorization,ManufacturerController.update)
router.delete("/:manuid",authentication,authorization,ManufacturerController.delete)
router.get("/",ManufacturerController.get)
router.get("/bycategoryid/:categoryid",ManufacturerController.getByCategoryId)
router.get("/bycategoryid/",ManufacturerController.getByCategoryId)

export default router;
