import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import API from "../api/api";

const CategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get("/complaints/all");
        console.log("Complaints:", res.data);
        const complaints = res.data;

        const categoryCount = {};
        complaints.forEach((c) => {
          const category = c.category || "Uncategorized";
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        });

        const formattedData = Object.keys(categoryCount).map((key) => ({
          category: key,
          count: categoryCount[key],
        }));

        console.log("Formatted chart data:", formattedData);
        setData(formattedData);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Complaints by Category
      </h2>
      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No complaint data found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" name="Number of Complaints" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryChart;
