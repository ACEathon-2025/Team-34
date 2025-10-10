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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Submit Complaint
      </h2>
      <input
        type="text"
        placeholder="Complaint Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
        required
      />
      <textarea
        placeholder="Complaint Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Analyzing..." : "Submit"}
      </button>
    </form>
  );
}
