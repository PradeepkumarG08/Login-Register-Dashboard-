const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Get all users
router.get("/", authMiddleware, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Add user
router.post("/", authMiddleware, async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.status(201).json(newUser);
});

// Update user
router.put("/:id", authMiddleware, async (req, res) => {
  const { name, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
  res.json(updatedUser);
});

// Delete user
router.delete("/:id", authMiddleware, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

module.exports = router;
