import express from "express";
import { updateProfile } from "../controllers/userController";
import { protect } from "../middlewares/middleware";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management
 */

/**
 * @swagger
 * /profile:
 *   patch:
 *     summary: Update the logged-in user's profile or password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               currency:
 *                 type: string
 *                 example: RON
 *               currentPassword:
 *                 type: string
 *                 description: Required when setting a new password
 *               newPassword:
 *                 type: string
 *                 description: New password to set
 *     responses:
 *       200:
 *         description: Profile updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized or incorrect current password
 *       404:
 *         description: User not found
 */
const router = express.Router();

router.patch("/", protect, updateProfile);

export default router;
