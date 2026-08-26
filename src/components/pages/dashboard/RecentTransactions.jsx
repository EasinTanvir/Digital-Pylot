import Image from "next/image";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

export default function RecentTransactions({ transactions, title, viewAll }) {
  return (
    <Card className="min-w-0 overflow-hidden">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-sm font-bold text-text-heading">{title}</h2>
        <button className="rounded border border-border-100 px-2 py-1 text-[10px] text-text-heading">
          {viewAll}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left">
          <thead className="bg-neutral-blue-50 text-[10px] font-bold text-table-header">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-3 py-2">Order Details</th>
              <th className="px-3 py-2">Payment</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="text-[10px] text-text-body">
                <td className="px-4 py-2">{transaction.id}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={transaction.image}
                      alt={transaction.orderDetails}
                      width={28}
                      height={28}
                      className="rounded bg-surface-150 object-cover"
                    />
                    <div>
                      <p className="font-bold text-text-heading">
                        {transaction.orderDetails}
                      </p>
                      <p>◷ {transaction.time}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <p>{transaction.paymentMethod}</p>
                  <p className="text-info">{transaction.payment}</p>
                </td>
                <td className="px-3 py-2">
                  <Badge status={transaction.status} />
                </td>
                <td className="px-4 py-2 font-bold text-text-heading">
                  {transaction.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
