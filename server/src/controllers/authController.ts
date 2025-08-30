import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import generateToken from "../utils/generateToken";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already used." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      currency: "RON",
    });

    await newUser.save();

    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        currency: newUser.currency,
      },
      token: generateToken(newUser._id.toString()),
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Eroare la înregistrare. Încearcă din nou." });
  }
};

interface LoginBody {
  email: string;
  password: string;
}

export const loginUser = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        currency: user.currency,
      },
      token: generateToken(user._id.toString()),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in. Please try again." });
  }
};
