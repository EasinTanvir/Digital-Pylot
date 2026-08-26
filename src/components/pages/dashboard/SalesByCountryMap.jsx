import Card from "@/components/ui/Card";

export default function SalesByCountryMap({
  countries,
  title,
  thisWeek,
  increaseLabel,
}) {
  const highlighted = countries.find((country) => country.isHighlighted);
  return (
    <Card className="min-h-[300px] p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-text-heading">{title}</h2>
        <button className="rounded border border-border-100 px-2 py-1 text-[10px] text-text-body">
          {thisWeek}⌄
        </button>
      </div>
      <div className="relative mt-4 h-36 overflow-hidden text-border-100">
        <svg
          aria-label="World sales map"
          viewBox="0 0 320 145"
          className="h-full w-full fill-current"
        >
          <path d="M15 30 63 18l43 20-8 32-31 9-11 36-24-9 4-28-21-14zM121 24l32 6 20 18-14 17-23-5-21-18zM180 35l36-17 61 9 31 27-20 23-31-8-22 17-19-13-31 5-15-26zM135 72l24 13 6 37-20 20-13-27zM220 85l22 5 18 39-21 10-21-31z" />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-primary px-8 py-2 text-center text-xs text-white">
          <p>{highlighted?.country}</p>
          <p className="mt-2 text-[10px] text-text-heading">
            {highlighted?.sales} Sales
          </p>
        </div>
      </div>
      <p className="mt-7 text-center text-[10px] text-text-body">
        <span className="font-bold text-success">⌃ 48%</span> {increaseLabel}
      </p>
    </Card>
  );
}
