import dayjs from "dayjs";
import { CiBoxes, CiDeliveryTruck } from "react-icons/ci";
import { MdAttachMoney, MdOutlineCreateNewFolder } from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { formatCurrency } from "../utils/index.js";
import DashboardCard from "./DashboardCard.jsx";

const DashboardSummary = () => {
  const loaderData = useLoaderData();
  if (!loaderData) return null;
  const { parcels } = loaderData;
  let moneySum = 0;
  let dailyCreated = 0;
  let dailyArrived = 0;
  let dailyPickup = 0;

  for (const parcel of parcels) {
    if (dayjs(parcel.createdAt).isSame(dayjs(), "day")) {
      dailyCreated++;
    }
    if (
      (parcel.status === "arrived" &&
        dayjs(parcel.arrivedAt).isSame(dayjs(), "day")) ||
      (parcel.status === "pickup" &&
        dayjs(parcel.arrivedAt).isSame(dayjs(), "day"))
    ) {
      dailyArrived++;
    }
    if (
      parcel.status === "pickup" &&
      dayjs(parcel.pickup).isSame(dayjs(), "day")
    ) {
      moneySum += parcel.serviceCharge;
      dailyPickup++;
    }
  }

  return (
    <div>
      <h2>Today's date: {new Date().toString()}</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Daily payment received"
          value={formatCurrency(moneySum)}
          icon={<MdAttachMoney className="w-6 h-6" />}
        />
        <DashboardCard
          title="Daily parcel created"
          value={`${dailyCreated} parcels`}
          icon={<MdOutlineCreateNewFolder className="w-6 h-6" />}
        />
        <DashboardCard
          title="Daily parcel arrived"
          value={`${dailyArrived} parcels`}
          icon={<CiBoxes className="w-6 h-6" />}
        />
        <DashboardCard
          title="Daily parcel pickup"
          value={`${dailyPickup} parcels`}
          icon={<CiDeliveryTruck className="w-6 h-6" />}
        />
      </div>
    </div>
  );
};
export default DashboardSummary;
