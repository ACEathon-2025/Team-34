export default function ComplaintCard({ complaint }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="font-bold text-lg">{complaint.title}</h3>
      <p className="text-gray-600">{complaint.description}</p>
      <span className="text-sm mt-2 inline-block">
        <strong>Status:</strong> {complaint.status}
      </span>
    </div>
  );
}
