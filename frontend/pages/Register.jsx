import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully! You can now log in.");
      navigate("/login");
    } catch {
      alert("Registration failed.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="authority">Authority</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}
