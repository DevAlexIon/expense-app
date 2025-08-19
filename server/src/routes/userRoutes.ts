import express from "express";
import { updateProfile } from "../controllers/userController";
import { protect } from "../middlewares/middleware";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management
 */
const router = express.Router();

router.patch("/", protect, updateProfile);

export default router;
