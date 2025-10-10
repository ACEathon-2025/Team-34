import { useEffect, useState } from "react";
import API from "../api/api";
import CategoryChart from "../components/CategoryChart";

export default function AuthorityDashboard({ setUser }) {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/all");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/complaints/${id}`, { status });
      fetchComplaints();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Authority Dashboard 🏛️</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <CategoryChart />
      <br></br>
      <div className="grid gap-4">
        {complaints.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="font-bold">{c.title}</h3>
            <p className="text-gray-700">{c.description}</p>
            <p className="text-sm mt-2 text-gray-600">User: {c.user?.email}</p>
            <div className="mt-2 text-sm text-gray-600">
              <p>
                Category: <b>{c.category}</b>
              </p>

              <p>
                Sentiment: <b>{c.sentiment}</b> ({c.sentimentConfidence}%)
              </p>
              <p>
                Category: <b>{c.category}</b> ({c.confidence}%)
              </p>

              <p>
                Status: <b>{c.status}</b>
              </p>
            </div>
            <div className="mt-3">
              <select
                className="border p-2 rounded"
                value={c.status}
                onChange={(e) => updateStatus(c._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
