import OrderController from "../controllers/OrderController.js";
import {Router} from "express";
import {authorization,authentication} from "../middlewares/authMiddleware"

const router=Router()
router.post("/",OrderController.create)
router.patch("/",authentication,authorization,OrderController.update)
router.delete("/:orderid",authentication,OrderController.delete)
router.get("/",OrderController.getAll)
router.get("/:orderid",OrderController.get)


export default router;
