import express from "express";
import { protect } from "../middlewares/middleware";
import { getTransactions } from "../controllers/transactionController";

const router = express.Router();

router.get("/", protect, getTransactions);

export default router;
