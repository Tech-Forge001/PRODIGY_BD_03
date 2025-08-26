const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { signToken } = require("../middleware/auth");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, age, password, role } = req.body;
    if (!name || !email || !age || !password)
      return res.status(400).json({ error: "name, email, age, password required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already registered" });

    const user = await User.create({ name, email, age, password, role });
    const token = signToken({ id: user._id, role: user.role });
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, age: user.age, role: user.role },
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "email and password required" });

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken({ id: user._id, role: user.role });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, age: user.age, role: user.role },
    });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
