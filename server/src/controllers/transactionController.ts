import { Response } from "express";
import Transaction from "../models/Transaction";
import { AuthRequest } from "../middlewares/middleware";
import { convertCurrency } from "../utils/convercy";
import { User } from "../models/User";

interface TransactionBody {
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: Date;
}

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const transactions = await Transaction.find({ user: userId }).lean();

    const convertedTransactions = await Promise.all(
      transactions.map(async (t) => {
        const convertedAmount = await convertCurrency(
          t.amount,
          t.currency,
          user.currency
        );

        return {
          ...t,
          amount: convertedAmount,
          currency: user.currency,
        };
      })
    );

    res.json(convertedTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { type, amount, category, description, date } =
      req.body as TransactionBody;

    if (!type || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (amount < 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number." });
    }

    const newTransaction = await Transaction.create({
      user: req.user!.id,
      type,
      amount,
      category,
      description,
      date,
    });

    return res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { type, amount, category, description, date } = (req.body ||
      {}) as TransactionBody;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        type,
        amount,
        category,
        description,
        date,
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    return res.json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    return res.json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
