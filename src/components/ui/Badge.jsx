export default function Badge({ status }) {
  const labels = {
    completed: "Success",
    pending: "Pending",
    cancelled: "Cancelled",
  };
  const colors = {
    completed: "bg-success",
    pending: "bg-teal-alt",
    cancelled: "bg-danger-bright",
  };
  return (
    <div
      className={`rounded-[5px] max-w-max w-auto flex items-center gap-1.5 px-2 py-2.5 text-[10px] font-medium leading-none text-white ${colors[status] ?? "bg-info"}`}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-white" />
      {labels[status] ?? status}
    </div>
  );
}
