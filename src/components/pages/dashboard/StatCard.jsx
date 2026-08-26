import Image from "next/image";
import Card from "@/components/ui/Card";
import { formatCurrency } from "@/lib/formatCurrency";

export default function StatCard({ type, stat, title, icon }) {
  const isEarning = type === "earning";
  const isSales = type === "sales";
  return (
    <Card
      className={`relative min-h-32 overflow-hidden p-5 ${isSales ? "border-primary bg-primary text-white" : type === "purchased" ? "border-secondary bg-secondary text-white" : ""}`}
    >
      <p
        className={`text-sm font-medium ${isEarning ? "text-primary" : "text-white/80"}`}
      >
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold leading-none">
        {isEarning
          ? formatCurrency(stat.amount, stat.currency)
          : `${stat.value.toLocaleString("en-US")}${isSales ? "+" : "+"}`}
      </p>
      <p
        className={`mt-1 text-xs ${isEarning ? "text-text-body" : "text-white/80"}`}
      >
        {isEarning ? (
          <>
            <span className="font-bold text-success">
              ⌃ {stat.changePercent}%
            </span>{" "}
            {stat.label}
          </>
        ) : (
          stat.label
        )}
      </p>
      <Image
        src={icon}
        alt=""
        width={45}
        height={45}
        className="absolute bottom-4 right-5 h-11 w-11 object-contain"
      />
    </Card>
  );
}
