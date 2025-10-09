import { useEffect, useState } from "react";
import API from "../api/api";
import ComplaintCard from "../components/ComplaintCard";

export default function UserDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const fetchComplaints = async () => {
    const res = await API.get("/complaints");
    setComplaints(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/complaints", form);
    setForm({ title: "", description: "" });
    fetchComplaints();
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">User Dashboard</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3 w-1/2">
        <input
          type="text"
          placeholder="Complaint Title"
          value={form.title}
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          className="border p-2 rounded"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="bg-blue-600 text-white py-2 rounded">
          Submit Complaint
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Your Complaints</h3>
      <div className="grid gap-4">
        {complaints.map((c) => (
          <ComplaintCard key={c._id} complaint={c} />
        ))}
      </div>
    </div>
  );
}
