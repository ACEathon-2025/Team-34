const express = require("express");
const Complaint = require("../models/Complaint");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { title, description } = req.body;
  const complaint = await Complaint.create({
    user: req.user.id,
    title,
    description,
  });
  res.json(complaint);
});

router.get("/", protect, async (req, res) => {
  const complaints = await Complaint.find({ user: req.user.id });
  res.json(complaints);
});

router.get("/all", protect, async (req, res) => {
  if (req.user.role !== "authority")
    return res.status(403).json({ message: "Access denied" });
  const complaints = await Complaint.find().populate("user", "name email");
  res.json(complaints);
});

router.put("/:id", protect, async (req, res) => {
  const { status } = req.body;
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) return res.status(404).json({ message: "Not found" });

  complaint.status = status || complaint.status;
  await complaint.save();
  res.json(complaint);
});

module.exports = router;
