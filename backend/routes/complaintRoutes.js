// backend/routes/complaintRoutes.js
import express from "express";
import Complaint from "../models/Complaint.js";
import protect from "../middleware/authMiddleware.js";
import { analyzeComplaint } from "../ml/mlAnalyzer.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { title, description } = req.body;

    const aiResult = await analyzeComplaint(`${title} ${description}`);

    const complaint = await Complaint.create({
      user: req.user.id,
      title,
      description,
      sentiment: aiResult.sentiment,
      sentimentConfidence: aiResult.sentimentConfidence,
      category: aiResult.category,
      confidence: aiResult.confidence,
      status: "Pending",
    });

    res.json({ success: true, complaint });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({ message: "Error creating complaint" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching complaints" });
  }
});

router.get("/all", protect, async (req, res) => {
  try {
    if (req.user.role !== "authority")
      return res.status(403).json({ message: "Access denied" });

    const complaints = await Complaint.find().populate("user", "name email");
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all complaints" });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: "Not found" });

    complaint.status = status || complaint.status;
    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Error updating complaint" });
  }
});

export default router;
