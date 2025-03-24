import {
  CallIcon,
  HeartIcon,
  MailIcon,
  ReportIcon,
  ShareIcon,
  WhatsappIcon,
} from "@/imports/icons";

const USER_ACTIONS = [
  { icon: <HeartIcon size={21} color="#16a34a" />, label: "Save" },
  { icon: <ShareIcon size={21} color="#16a34a" />, label: "Share" },
  { icon: <ReportIcon size={21} color="#16a34a" />, label: "Report" },
];

const CREATOR_ACTIONS = [
  { icon: <CallIcon size={21} color="#fff" />, label: "Call" },
  { icon: <MailIcon size={21} color="#fff" />, label: "Mail" },
  { icon: <WhatsappIcon size={21} color="#fff" />, label: "Whatsapp" },
];

const LIBRARIES = ["places"];

export { USER_ACTIONS, CREATOR_ACTIONS, LIBRARIES };
