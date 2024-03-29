import { BiCustomize } from "react-icons/bi";
import { FaBox } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

export const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "adminDashboard", text: "dashboard" },
  { id: 3, url: "parcels", text: "parcels" },
  { id: 4, url: "dashboard", text: "dashboard" },
  { id: 5, url: "report", text: "report" },
  { id: 6, url: "tracking", text: "tracking" },
];

export const services = [
  {
    id: 1,
    title: "parcel tracking & management",
    description:
      "stay in control of your shipments with our advanced parcel tracking and management system. From origin to destination, monitor every step of your parcels' journey in real-time.",
    icon: <FaBox className="h-14 w-14 text-secondary mx-auto" />,
  },
  {
    id: 2,
    title: "automated notifications",
    description:
      "Our system keeps you informed every step of the way. Receive automated notifications for key updates, including parcel arrival and successful pickups. Stay on top of your logistics with timely alerts.",
    icon: <IoIosNotifications className="h-14 w-14 text-secondary mx-auto" />,
  },
  {
    id: 3,
    title: "customizable solutions",
    description:
      "we understand that every business is unique. That's why our Parcel Management System is designed to be flexible and customizable. Tailor the system to align with your specific workflow and requirements, ensuring a seamless integration with your existing processes.",
    icon: <BiCustomize className="h-14 w-14 text-secondary mx-auto" />,
  },
];

export const colors = [
  "choose color",
  "putih",
  "hitam",
  "kelabu",
  "kuning",
  "merah",
  "hijau",
  "biru",
  "pink",
  "peach",
  "oren",
  "coklat",
  "purple",
  "silver",
  "gold",
  "pattern wrap",
  "bubble wrap",
  "rose gold/bronze",
];
export const sizes = [
  "choose size",
  "small",
  "medium",
  "large",
  "kotak atas",
  "kotak besar (luar)",
  "surat/dokumen",
  "panjang",
  "besar (luar)",
  "bulat",
];

export const prices = [0.0, 1.0, 2.0, 3.0, 4.0, 5.0];
