import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/create", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUserById); 
router.delete("/:id", userController.deleteUserById);

export const userRoutes = router;
