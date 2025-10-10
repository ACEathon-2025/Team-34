import { useEffect, useState } from "react";
import API from "../api/api";
import ComplaintForm from "./ComplaintForm";

export default function UserDashboard({ setUser }) {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleComplaintAdded = (newComplaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Dashboard 👤</h1>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <ComplaintForm onComplaintAdded={handleComplaintAdded} />

      <h2 className="text-xl font-semibold mb-4">Your Complaints</h2>
      <div className="grid gap-4">
        {complaints.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded shadow-md">
            <h3 className="font-bold">{c.title}</h3>
            <p className="text-gray-700">{c.description}</p>
            <div className="mt-2 text-sm text-gray-600">
              <p>
                Sentiment: <b>{c.sentiment}</b>
              </p>
              <p>
                Category: <b>{c.category}</b>
              </p>
              <p>
                Confidence: <b>{c.confidence}%</b>
              </p>
              <p>
                Status: <b>{c.status}</b>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
