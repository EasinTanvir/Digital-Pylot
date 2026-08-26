// Icon imports - from assets/icons folder
import DashboardIcon from "@/assets/icons/Icon.svg";
import SuperAdminIcon from "@/assets/icons/device-laptop.svg";
import ProductsIcon from "@/assets/icons/box.svg";
import CreateProductIcon from "@/assets/icons/circle-plus.svg";
import ExpiredIcon from "@/assets/icons/checklist.svg";
import LowStocksIcon from "@/assets/icons/barcode.svg";
import CategoryIcon from "@/assets/icons/layout-grid.svg";
import SubCategoryIcon from "@/assets/icons/carousel-vertical.svg";
import BrandsIcon from "@/assets/icons/files.svg";
import UnitsIcon from "@/assets/icons/file-invoice.svg";
import VariantIcon from "@/assets/icons/list-details.svg";
import WarrantiesIcon from "@/assets/icons/Expand Icon.svg";
import BarcodeIcon from "@/assets/icons/barcode.svg";
import QRCodeIcon from "@/assets/icons/barcode.svg";

import ManageStockIcon from "@/assets/icons/layout-grid.svg";
import StockAdjustmentIcon from "@/assets/icons/carousel-vertical.svg";
import StockTransferIcon from "@/assets/icons/files.svg";

import SalesIcon from "@/assets/icons/box.svg";
import InvoicesIcon from "@/assets/icons/file-invoice.svg";
import SalesReturnIcon from "@/assets/icons/checklist.svg";
import QuotationIcon from "@/assets/icons/files.svg";
import POSIcon from "@/assets/icons/device-laptop.svg";

import SearchIcon from "@/assets/icons/Icon.svg";
import NotificationIcon from "@/assets/icons/Bell Icon.svg";
import SettingsIcon from "@/assets/icons/device-laptop.svg";

// Stat card icons
import EarningIcon from "@/assets/icons/box.svg";
import SalesCountIcon from "@/assets/icons/layout-grid.svg";
import PurchasedIcon from "@/assets/icons/checklist.svg";

// Logo
import LogoIcon from "@/assets/icons/Logo.svg";

export const ICONS = {
  logo: LogoIcon,
  sidebar: {
    dashboard: DashboardIcon,
    superAdmin: SuperAdminIcon,
  },
  inventory: {
    products: ProductsIcon,
    createProduct: CreateProductIcon,
    expired: ExpiredIcon,
    lowStocks: LowStocksIcon,
    category: CategoryIcon,
    subCategory: SubCategoryIcon,
    brands: BrandsIcon,
    units: UnitsIcon,
    variant: VariantIcon,
    warranties: WarrantiesIcon,
    barcode: BarcodeIcon,
    qrCode: QRCodeIcon,
  },
  stock: {
    manage: ManageStockIcon,
    adjustment: StockAdjustmentIcon,
    transfer: StockTransferIcon,
  },
  sales: {
    sales: SalesIcon,
    invoices: InvoicesIcon,
    return: SalesReturnIcon,
    quotation: QuotationIcon,
    pos: POSIcon,
  },
  header: {
    search: SearchIcon,
    notification: NotificationIcon,
    settings: SettingsIcon,
  },
  stats: {
    earning: EarningIcon,
    sales: SalesCountIcon,
    purchased: PurchasedIcon,
  },
};

// Status badge colors
export const STATUS_COLORS = {
  completed: "success",
  pending: "warning",
  processing: "info",
  cancelled: "danger",
};

// Sidebar navigation structure
export const SIDEBAR_STRUCTURE = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", icon: "sidebar.dashboard", href: "/dashboard" },
      {
        label: "Super Admin",
        icon: "sidebar.superAdmin",
        href: "/dashboard/super-admin",
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
      { label: "Sales", icon: "sales.sales", href: "/dashboard/sales" },
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
      { label: "POS", icon: "sales.pos", href: "/dashboard/pos" },
    ],
  },
  {
    section: "Promo",
    items: [
      { label: "Promo", icon: "sidebar.dashboard", href: "/dashboard/promo" },
    ],
  },
];
