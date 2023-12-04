import express from "express";

import { UserController } from "./users.controller";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:userId", UserController.getSingleUser);
router.delete("/:userId", UserController.deleteSingleUser);
router.put("/:userId/orders", UserController.updateOrder);
router.get("/:userId/orders", UserController.getOrders);
router.get("/:userId/orders/total-price", UserController.getOrdersPrice);

export const UsersRoutes = router;
