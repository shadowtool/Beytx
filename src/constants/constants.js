import {
  CallIcon,
  HeartIcon,
  MailIcon,
  ReportIcon,
  ShareIcon,
  WhatsappIcon,
} from "@/imports/icons";

export const USER_ACTIONS = [
  { icon: <HeartIcon size={21} color="#16a34a" />, label: "Save" },
  { icon: <ShareIcon size={21} color="#16a34a" />, label: "Share" },
  { icon: <ReportIcon size={21} color="#16a34a" />, label: "Report" },
];

export const CREATOR_ACTIONS = [
  { icon: <CallIcon size={21} color="#fff" />, label: "Call" },
  { icon: <MailIcon size={21} color="#fff" />, label: "Mail" },
  { icon: <WhatsappIcon size={21} color="#fff" />, label: "Whatsapp" },
];

export const LIBRARIES = ["places"];

export const SORT_OPTIONS = [
  {
    label: "Price - Low to High",
    value: "price_asc",
  },
  {
    label: "Price - High to Low",
    value: "price_desc",
  },
  {
    label: "Latest",
    value: "listing_date",
  },
  {
    label: "Beds - Low to High",
    value: "beds_asc",
  },
  {
    label: "Beds - High to Low",
    value: "beds_desc",
  },
  {
    label: "Baths - Low to High",
    value: "baths_asc",
  },
  {
    label: "Baths - High to Low",
    value: "baths_desc",
  },
];

export const PRICE_OPTIONS = [
  { label: "100,000", value: 100000 },
  { label: "200,000", value: 200000 },
  { label: "300,000", value: 300000 },
  { label: "400,000", value: 400000 },
  { label: "500,000", value: 500000 },
  { label: "600,000", value: 600000 },
  { label: "700,000", value: 700000 },
  { label: "800,000", value: 800000 },
  { label: "900,000", value: 900000 },
  { label: "1,000,000", value: 1000000 },
];
