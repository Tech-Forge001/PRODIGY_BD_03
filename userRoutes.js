const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { requireAuth, permitRoles, isOwnerOrAdmin } = require("../middleware/auth");

// GET /api/users (admin only)
router.get("/", requireAuth, permitRoles("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// GET /api/users/:id (owner or admin)
router.get("/:id", requireAuth, isOwnerOrAdmin, async (req, res) => {
  const u = await User.findById(req.params.id).select("-password");
  if (!u) return res.status(404).json({ error: "User not found" });
  res.json(u);
});

// PUT /api/users/:id (owner or admin)
router.put("/:id", requireAuth, isOwnerOrAdmin, async (req, res) => {
  const allowed = (({ name, email, age, role, password }) => ({ name, email, age, role, password }))(req.body);
  // If password provided, let pre-save hook hash it: fetch, set, save
  const user = await User.findById(req.params.id).select("+password");
  if (!user) return res.status(404).json({ error: "User not found" });
  Object.assign(user, allowed);
  await user.save();
  const clean = await User.findById(user._id).select("-password");
  res.json(clean);
});

// DELETE /api/users/:id (admin only)
router.delete("/:id", requireAuth, permitRoles("admin"), async (req, res) => {
  const u = await User.findByIdAndDelete(req.params.id);
  if (!u) return res.status(404).json({ error: "User not found" });
  res.json({ message: "User deleted" });
});

// GET /api/users/profile (current user)
router.get("/me/profile", requireAuth, async (req, res) => {
  const me = await User.findById(req.user.id).select("-password");
  res.json(me);
});

module.exports = router;
