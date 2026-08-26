export default function Badge({ status }) {
  const labels = { completed: "Success", pending: "Pending", cancelled: "Cancelled" };
  const colors = {
    completed: "bg-success",
    pending: "bg-teal-alt",
    cancelled: "bg-danger-bright",
  };
  return <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold leading-none text-white ${colors[status] ?? "bg-info"}`}>{labels[status] ?? status}</span>;
}
