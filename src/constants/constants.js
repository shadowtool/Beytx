import {
  AgentIcon,
  CallIcon,
  HeartIcon,
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
  { icon: <CallIcon size={21} color="#fff" />, label: "Call", value: "call" },
  {
    icon: <WhatsappIcon size={21} color="#fff" />,
    label: "Whatsapp",
    value: "whatsapp",
  },
  {
    icon: <AgentIcon size={21} color="#fff" />,
    label: "Agent Properties",
    value: "agentProperties",
  },
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

export const PRICE_OPTIONS_SALE = [
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

export const PRICE_OPTIONS_RENT = [
  { label: "100", value: 100 },
  { label: "200", value: 200 },
  { label: "300", value: 300 },
  { label: "400", value: 400 },
  { label: "500", value: 500 },
  { label: "600", value: 600 },
  { label: "700", value: 700 },
  { label: "800", value: 800 },
  { label: "900", value: 900 },
  { label: "1000", value: 1000 },
];

export const USER_ROLES = ["user", "admin"];
