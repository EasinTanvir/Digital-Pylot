export default function MissingIcon({ label = "?" }) {
  return <span aria-label={`${label} icon unavailable`} className="flex h-5 w-5 items-center justify-center border border-dashed border-danger text-[8px] font-bold text-danger">{label}</span>;
}
