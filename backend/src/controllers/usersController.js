
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";


export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

 
    const existingUser = await UserModel.findByEmailOrUsername(email, username);
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserId = await UserModel.create(username, email, hashedPassword);

    res.status(201).json({ message: "User registered successfully", id: newUserId });
  } catch (err) {
    res.status(500).json({ message: "Server error during registration", error: err.message });
    console.log(err);
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Both fields are required" });

    const user = await UserModel.findByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });


    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

  
    await UserModel.addRefreshToken(user.id, refreshToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error during login", error: err.message });
  }
};


export const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(400).json({ message: "Refresh token is required" });

    const user = await UserModel.findByRefreshToken(refreshToken);
    if (!user) return res.status(400).json({ message: "Invalid refresh token" });

    await UserModel.removeRefreshToken(refreshToken);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error during logout", error: err.message });
  }
};
