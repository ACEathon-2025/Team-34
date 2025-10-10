import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  sentiment: String,
  sentimentConfidence: Number,
  category: String,
  confidence: Number,
  status: { type: String, default: "Pending" },
});

export default mongoose.model("Complaint", complaintSchema);
