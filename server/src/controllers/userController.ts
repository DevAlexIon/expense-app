import { AuthRequest } from "../middlewares/middleware";
import { Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";

interface UserProfile {
  name?: string;
  email?: string;
  currency?: string;
  password?: string;
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, currency } = req.body || ({} as UserProfile);

    if (!name && !email && !password && !currency) {
      return res
        .status(400)
        .json({ message: "Please provide at least one field to update." });
    }

    const user = await User.findById(req.user!.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (currency) user.currency = currency;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      currency: user.currency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
