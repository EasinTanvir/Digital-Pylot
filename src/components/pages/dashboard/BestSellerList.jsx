import Image from "next/image";
import Card from "@/components/ui/Card";

export default function BestSellerList({ products, title, viewAll }) {
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold text-text-heading">{title}</h2>
        <button className="rounded border border-border-100 px-2 py-1 text-[10px] text-text-heading">
          {viewAll}
        </button>
      </div>
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-2">
            <Image
              src={product.image}
              alt={product.name}
              width={32}
              height={32}
              className="rounded bg-surface-150 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-text-heading">
                {product.name}
              </p>
              <p className="text-[10px] text-text-body">{product.price}</p>
            </div>
            <div className="text-right text-[10px] text-text-body">
              <p>Sales</p>
              <p className="font-bold text-text-heading">{product.sales}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
