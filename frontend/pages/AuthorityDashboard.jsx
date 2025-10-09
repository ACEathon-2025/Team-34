import { useEffect, useState } from "react";
import API from "../api/api";

export default function AuthorityDashboard() {
  const [complaints, setComplaints] = useState([]);

  const fetchAll = async () => {
    const res = await API.get("/complaints/all");
    setComplaints(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/complaints/${id}`, { status });
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Authority Dashboard</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c._id} className="border">
              <td className="border p-2">{c.title}</td>
              <td className="border p-2">{c.user?.name}</td>
              <td className="border p-2">{c.status}</td>
              <td className="border p-2">
                <select
                  value={c.status}
                  onChange={(e) => updateStatus(c._id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
