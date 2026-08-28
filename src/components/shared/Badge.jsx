export default function Badge({ status }) {
  const normalizedStatus = String(status).toLowerCase();

  const getBadgeStyle = () => {
    switch (normalizedStatus) {
      case "success":
      case "completed":
        return "bg-teal text-white";
      case "cancelled":
      case "canceled":
      case "failed":
        return "bg-danger text-white";
      case "pending":
      case "processing":
        return "bg-teal-alt text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium capitalize leading-none ${getBadgeStyle()}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      {status}
    </span>
  );
}
