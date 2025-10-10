// backend/models/Complaint.js
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    sentiment: { type: String },
    category: { type: String },
    confidence: { type: String },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
