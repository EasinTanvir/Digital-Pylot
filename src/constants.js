// Icon imports - from assets/icons folder
import DashboardIcon from "@/assets/icons/layout-grid.svg";
import SuperAdminIcon from "@/assets/icons/user-edit.svg";
import ProductsIcon from "@/assets/icons/box.svg";
import CreateProductIcon from "@/assets/icons/table-plus.svg";
import ExpiredIcon from "@/assets/icons/progress-alert.svg";
import LowStocksIcon from "@/assets/icons/trending-up-2.svg";
import CategoryIcon from "@/assets/icons/list-details.svg";
import SubCategoryIcon from "@/assets/icons/carousel-vertical.svg";
import BrandsIcon from "@/assets/icons/brand-unity.svg";
import UnitsIcon from "@/assets/icons/stack-3.svg";
import VariantIcon from "@/assets/icons/list-details.svg";
import WarrantiesIcon from "@/assets/icons/certificate.svg";
import BarcodeIcon from "@/assets/icons/barcode.svg";
import QRCodeIcon from "@/assets/icons/qrcode.svg";

import ManageStockIcon from "@/assets/icons/stack-3.svg";
import StockAdjustmentIcon from "@/assets/icons/stairs-up.svg";
import StockTransferIcon from "@/assets/icons/triangles.svg";

import SalesIcon from "@/assets/icons/shopping-cart.svg";
import InvoicesIcon from "@/assets/icons/file-invoice.svg";
import SalesReturnIcon from "@/assets/icons/receipt-refund.svg";
import QuotationIcon from "@/assets/icons/files.svg";
import POSIcon from "@/assets/icons/device-laptop (1).svg";

import SearchIcon from "@/assets/icons/Icon.svg";
import NotificationIcon from "@/assets/icons/Bell Icon.svg";
import SettingsIcon from "@/assets/icons/device-laptop.svg";
import CalendarIcon from "@/assets/icons/Calendar Icon.svg";
import RefreshIcon from "@/assets/icons/Refresh Icon.svg";
import ExpandIcon from "@/assets/icons/Expand Icon.svg";
import MailIcon from "@/assets/icons/Mail Icon.svg";
import MaximizeIcon from "@/assets/icons/Maximize Icon.svg";
import UserAvatarIcon from "@/assets/icons/User Icon.svg";
import AddNewIcon from "@/assets/icons/circle-plus.svg";

// Stat card icons
import EarningIcon from "@/assets/icons/Image (2).svg";
import SalesCountIcon from "@/assets/icons/image 3 (traced).svg";
import PurchasedIcon from "@/assets/icons/image 3 (traced).svg";

// Logo
import LogoIcon from "@/assets/icons/Logo.svg";
import SidebarToggleIcon from "@/assets/icons/Sidebar Toggle Left.svg";
import ChevronRightIcon from "@/assets/icons/Vector.svg";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg";
import mapView from "@/assets/icons/mapicon.png";

import arrowDownIcon from "@/assets/icons/arrow-down.svg";
import circleIcon from "@/assets/icons/circleIcon.svg";

import carIcon from "@/assets/icons/carIcon.svg";
import locationIcon from "@/assets/icons/location.svg";
import pickupDateIcon from "@/assets/icons/pickupDate.svg";
import borderShape from "@/assets/icons/shapeIcon.svg";
import heartIcon from "@/assets/icons/heart.svg";

import phoneCallIcon from "@/assets/icons/phoneCall.svg";
import priceTagIcon from "@/assets/icons/pricetags.svg";

import arrowBackIcon from "@/assets/icons/arrowBack.svg";
import arrowForwardIcon from "@/assets/icons/arrowForward.svg";

import facebookIcon from "@/assets/icons/Facebook.svg";
import twitterIcon from "@/assets/icons/Twitter.svg";
import instagramIcon from "@/assets/icons/Instagram.svg";

import resetIconIcon from "@/assets/icons/resetIcon.svg";
import arrowUpGreenIcon from "@/assets/icons/arrowUpGreen.svg";

import BadgeGhostWithLeftIcons from "@/assets/icons/dashboardNav/Badge Ghost With Left Icons.svg";
import BellIcon from "@/assets/icons/dashboardNav/Bell Icon.svg";
import CirclePlus from "@/assets/icons/dashboardNav/circle-plus.svg";
import DeviceLaptop from "@/assets/icons/dashboardNav/device-laptop.svg";
import flagImage from "@/assets/icons/dashboardNav/Image (1).svg";
import avatarImage from "@/assets/icons/dashboardNav/image 1.svg";
import catImageIcon from "@/assets/icons/dashboardNav/Image.svg";
import navMailIcon from "@/assets/icons/dashboardNav/Mail Icon.svg";
import navMaximizeIcon from "@/assets/icons/dashboardNav/Maximize Icon.svg";
import navSearchIcon from "@/assets/icons/dashboardNav/Search Icon.svg";
import navSettingIcon from "@/assets/icons/dashboardNav/Settings Icon.svg";
import arrowDropdownIcon from "@/assets/icons/dashboardNav/Vector.svg";

import handIcon from "@/assets/icons/hand.svg";

export const ICONS = {
  handIcon,
  BadgeGhostWithLeftIcons,
  BellIcon,
  CirclePlus,
  DeviceLaptop,
  flagImage,
  avatarImage,
  catImageIcon,
  navMailIcon,
  navMaximizeIcon,
  navSearchIcon,
  navSettingIcon,
  arrowDropdownIcon,

  arrowUpGreenIcon,
  resetIconIcon,
  facebookIcon,
  twitterIcon,
  instagramIcon,
  arrowBackIcon,
  arrowForwardIcon,
  phoneCallIcon,
  priceTagIcon,
  heartIcon,
  carIcon,
  borderShape,
  locationIcon,
  pickupDateIcon,
  arrowDownIcon,
  circleIcon,
  mapView,
  logo: LogoIcon,
  sidebarToggle: SidebarToggleIcon,
  chevronRight: ChevronRightIcon,
  chevronDown: ChevronDownIcon,
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
    calendar: CalendarIcon,
    refresh: RefreshIcon,
    expand: ExpandIcon,
    mail: MailIcon,
    maximize: MaximizeIcon,
    avatar: UserAvatarIcon,
    addNew: AddNewIcon,
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
