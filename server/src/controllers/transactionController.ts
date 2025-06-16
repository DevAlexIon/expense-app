import { Response } from "express";
import Transaction from "../models/Transaction";
import { AuthRequest } from "../middlewares/middleware";

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const transactions = await Transaction.find({ user: userId }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
