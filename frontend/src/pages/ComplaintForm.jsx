import { useState } from "react";
import API from "../api/api";

export default function ComplaintForm({ onComplaintAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/complaints", { title, description });
      onComplaintAdded(res.data.complaint);
      setTitle("");
      setDescription("");
      alert("Complaint submitted successfully ✅");
    } catch (err) {
      console.error("Error submitting complaint:", err);
      alert("Error submitting complaint ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          📝 Submit a Complaint
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">
            Complaint Title
          </label>
          <input
            type="text"
            placeholder="Enter complaint title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Description
          </label>
          <textarea
            placeholder="Describe your complaint in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-md h-32 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-lg font-semibold rounded-lg text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Analyzing..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}
