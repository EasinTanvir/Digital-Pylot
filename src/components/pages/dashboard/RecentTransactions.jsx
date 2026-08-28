import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { HiOutlineClock } from "react-icons/hi2";

export default function RecentTransactions({
  transactions = [],
  title,
  viewAll,
}) {
  return (
    <Card className="min-w-0 overflow-hidden rounded-2xl border border-border-150 bg-white shadow-2xs">
      {/* Header section with bottom divider border */}
      <div className="flex items-center justify-between border-b border-border-150 px-6 py-4">
        <h2 className="text-base font-bold text-table-header">
          {title || "Recent Transactions"}
        </h2>
        <button className="rounded-[5px] border border-border-150 px-5 py-2.5 text-xs font-semibold text-table-header transition-colors hover:bg-surface-100">
          {viewAll || "View All"}
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left border-collapse">
          <thead>
            {/* Header row with light blue-tint background */}
            <tr className="bg-neutral-blue-50 text-xs font-semibold text-text-heading">
              <th className="w-[8%] py-3.5 pl-6 pr-2">#</th>
              <th className="w-[32%] px-4 py-3.5">Order Details</th>
              <th className="w-[24%] px-4 py-3.5">Payment</th>
              <th className="w-[18%] px-4 py-3.5">Status</th>
              <th className="w-[18%] py-3.5 pl-4 pr-6 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-150/40 text-xs">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-xs text-text-body"
                >
                  No transactions available
                </td>
              </tr>
            ) : (
              transactions.map((item, idx) => (
                <tr key={item.id || idx} className="transition-colors">
                  {/* # ID */}
                  <td className="py-4 pl-6 pr-2 font-normal text-text-body">
                    {idx + 1}
                  </td>

                  {/* Order Details */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 p-4  flex-center  rounded-md bg-surface-300 ">
                        <Image
                          src={item.image}
                          alt={item.orderDetails || "Product"}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-table-header">
                          {item.orderDetails}
                        </p>
                        <p className="mt-1 flex items-center gap-1  text-[15px] text-gray-700">
                          <HiOutlineClock className="h-3.5 w-3.5 " />
                          <span>{item.time}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Payment */}
                  <td className="px-4 py-4">
                    <p className=" text-sm text-table-header">
                      {item.paymentMethod}
                    </p>
                    <p className="mt-0.5 text-sm font-normal text-info">
                      # {item.payment}
                    </p>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-4">
                    <Badge status={item.status} />
                  </td>

                  {/* Amount */}
                  <td className="py-4 pl-4 pr-6 text-right font-bold text-table-header ">
                    {typeof item.amount === "number"
                      ? `$${item.amount.toFixed(2)}`
                      : item.amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
