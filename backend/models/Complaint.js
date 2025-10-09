const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending",
  },
  date: { type: Date, default: Date.now },
});

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;
