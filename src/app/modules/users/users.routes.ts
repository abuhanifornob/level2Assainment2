import express from "express";

import { UserController } from "./users.controller";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", UserController.getUsers);
router.get("/:userId", UserController.getSingleUser);
router.delete("/:userId", UserController.deleteSingleUser);
router.put("/:userId/orders", UserController.updateOrder);

export const UsersRoutes = router;
