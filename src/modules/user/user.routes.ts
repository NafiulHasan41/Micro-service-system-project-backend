import express from "express";
import { userController } from "./user.controller";
import { protect } from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/forgot-password", userController.updatePassword);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.updateUserById); 
router.delete("/:id", userController.deleteUserById);
router.get("/auth/me", protect , userController.getMe); // this will be protected route and will be used to maintain user logged in

export const userRoutes = router;
