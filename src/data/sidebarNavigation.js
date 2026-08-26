const sidebarNavigationMock = [
  {
    section: "Main",
    items: [
      {
        label: "Dashboard",
        icon: "sidebar.dashboard",
        href: "/dashboard",
        indicator: "down",
      },
      {
        label: "Super Admin",
        icon: "sidebar.superAdmin",
        href: "/dashboard/super-admin",
        indicator: "right",
      },
    ],
  },
  {
    section: "Inventory",
    items: [
      {
        label: "Products",
        icon: "inventory.products",
        href: "/dashboard/products",
      },
      {
        label: "Create Product",
        icon: "inventory.createProduct",
        href: "/dashboard/products/create",
      },
      {
        label: "Expired Products",
        icon: "inventory.expired",
        href: "/dashboard/expired",
      },
      {
        label: "Low Stocks",
        icon: "inventory.lowStocks",
        href: "/dashboard/low-stocks",
      },
      {
        label: "Category",
        icon: "inventory.category",
        href: "/dashboard/category",
      },
      {
        label: "Sub Category",
        icon: "inventory.subCategory",
        href: "/dashboard/sub-category",
      },
      { label: "Brands", icon: "inventory.brands", href: "/dashboard/brands" },
      { label: "Units", icon: "inventory.units", href: "/dashboard/units" },
      {
        label: "Variant Attributes",
        icon: "inventory.variant",
        href: "/dashboard/variants",
      },
      {
        label: "Warranties",
        icon: "inventory.warranties",
        href: "/dashboard/warranties",
      },
      {
        label: "Print Barcode",
        icon: "inventory.barcode",
        href: "/dashboard/barcode",
      },
      {
        label: "Print QR Code",
        icon: "inventory.qrCode",
        href: "/dashboard/qrcode",
      },
    ],
  },
  {
    section: "Stock",
    items: [
      { label: "Manage Stock", icon: "stock.manage", href: "/dashboard/stock" },
      {
        label: "Stock Adjustment",
        icon: "stock.adjustment",
        href: "/dashboard/stock/adjustment",
      },
      {
        label: "Stock Transfer",
        icon: "stock.transfer",
        href: "/dashboard/stock/transfer",
      },
    ],
  },
  {
    section: "Sales",
    items: [
      {
        label: "Sales",
        icon: "sales.sales",
        href: "/dashboard/sales",
        indicator: "right",
      },
      {
        label: "Invoices",
        icon: "sales.invoices",
        href: "/dashboard/invoices",
      },
      {
        label: "Sales Return",
        icon: "sales.return",
        href: "/dashboard/sales-return",
      },
      {
        label: "Quotation",
        icon: "sales.quotation",
        href: "/dashboard/quotation",
      },
      {
        label: "POS",
        icon: "sales.pos",
        href: "/dashboard/pos",
        indicator: "right",
      },
    ],
  },
  {
    section: "Promo",
    items: [
      { label: "Promo", icon: "sidebar.dashboard", href: "/dashboard/promo" },
    ],
  },
];

export function getSidebarNavigation() {
  return sidebarNavigationMock;
}
