import Image from "next/image";
import Card from "@/components/ui/Card";

export default function BestSellerList({ products = [], title, viewAll }) {
  return (
    <Card className="overflow-hidden rounded-xl border border-border-150 bg-white ">
      <div className="flex items-center justify-between border-b border-border-100 px-5 py-4">
        <h2 className="text-base font-bold text-table-header">
          {title || "Best Seller"}
        </h2>
        <button className="rounded-[5px] border border-border-150 px-5 py-2.5 text-xs font-semibold text-table-header transition-colors hover:bg-surface-100">
          {viewAll || "View All"}
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-4.5 p-5">
        {products.length === 0 ? (
          <p className="py-4 text-center text-xs text-text-body">
            No products available
          </p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              {/* Left: Thumbnail & Name/Price */}
              <div className="flex items-center gap-3.5">
                <div className="relative h-12 w-12 p-4  flex-center  rounded-md bg-surface-300 ">
                  <Image
                    src={product.image}
                    alt={product.name || "Product image"}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-table-header">
                    {product.name}
                  </p>
                  <p className="mt-0.5 text-[15px] text-gray-700">
                    {typeof product.price === "number"
                      ? `$${product.price}`
                      : product.price}
                  </p>
                </div>
              </div>

              {/* Right: Sales Label & Count */}
              <div className="text-right text-table-header text-xs">
                <p className=" font-normal ">Sales</p>
                <p className="mt-0.5 m font-medium ">{product.sales}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
