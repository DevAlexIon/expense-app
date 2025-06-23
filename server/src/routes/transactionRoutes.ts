import express from "express";
import { protect } from "../middlewares/middleware";
import {
  createTransaction,
  editTransaction,
  getTransactions,
} from "../controllers/transactionController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: User transactions
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions for the logged-in user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized - No token or invalid token
 */
router.get("/", protect, getTransactions);

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Create new user transactions
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create new transaction for the logged-in user
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized - No token or invalid token
 */

router.post("/", protect, createTransaction);

/**
 * @swagger
 * /transactions/{id}:
 *   patch:
 *     summary: Update a transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               amount:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *                 nullable: true
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       401:
 *         description: Unauthorized - No token or invalid token
 *       404:
 *         description: Transaction not found
 */
router.patch("/:id", protect, editTransaction);

export default router;
