import day from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import { CiBoxes, CiDeliveryTruck } from "react-icons/ci";
import {
  MdOutlineCreateNewFolder,
  MdOutlineDownloadDone,
} from "react-icons/md";
import { useLoaderData } from "react-router-dom";
import { formatCurrency } from "../utils/index.js";
day.extend(localizedFormat);

const ParcelInfo = () => {
  const loaderData = useLoaderData();
  if (!loaderData) return;
  const {
    parcel: {
      trackingNumber,
      parcelCode,
      color,
      size,
      serviceCharge,
      createdAt,
      arrivedAt,
      pickedUp,
    },
  } = loaderData;

  const formattedPrice = formatCurrency(serviceCharge);

  return (
    <section className="flex flex-col gap-y-8 justify-center">
      <div className="card w-96 mx-auto px-4 py-8">
        <h3 className="text-2xl font-medium tracking-wide">
          Tracking number: {trackingNumber}
        </h3>
        <p className="text-lg text-neutral-content">
          Parcel code: {parcelCode || "N/A"}
        </p>
        <p className="text-lg text-neutral-content">
          Service charge: {formattedPrice || "N/A"}
        </p>
        <p className="text-lg text-neutral-content">Color: {color || "N/A"}</p>
        <p className="text-lg text-neutral-content">Size: {size || "N/A"}</p>
      </div>
      <ul className="timeline timeline-vertical">
        <li>
          <div className="timeline-middle text-2xl rounded-xl bg-base-300 w-8 h-8 grid place-items-center ">
            <MdOutlineDownloadDone
              className={createdAt ? "text-secondary" : "text-white"}
            />
          </div>
          <div className="timeline-end timeline-box  shadow-lg hover:shadow-xl duration-300">
            <MdOutlineCreateNewFolder className="w-12 h-12 mx-auto text-secondary" />
            <div className="mt-4">
              <h3 className="text-lg tracking-wide">Status: Created</h3>
              <p className="text-sm">
                Created date : {day(createdAt).format("llll")}
              </p>
            </div>
          </div>
          <hr className={arrivedAt ? "bg-secondary" : null} />
        </li>

        <li>
          <hr className={arrivedAt ? "bg-secondary" : null} />
          <div className="timeline-middle text-2xl rounded-xl bg-base-300 w-8 h-8 grid place-items-center">
            <MdOutlineDownloadDone
              className={arrivedAt ? "text-secondary" : "text-white"}
            />
          </div>
          <div className="timeline-start timeline-box  shadow-lg hover:shadow-xl duration-300">
            <CiBoxes className="w-12 h-12 text-secondary mx-auto" />
            <div className="mt-4">
              <h3 className="text-lg tracking-wide">
                {arrivedAt ? "Status: Arrived" : "Status: N/A"}
              </h3>
              <p className="text-sm">
                Arrived date :{" "}
                {arrivedAt ? day(arrivedAt).format("llll") : "N/A"}
              </p>
            </div>
          </div>
          <hr className={pickedUp ? "bg-secondary" : null} />
        </li>

        <li>
          <hr className={pickedUp ? "bg-secondary" : null} />
          <div className="timeline-middle text-2xl rounded-xl bg-base-300 w-8 h-8 grid place-items-center">
            <MdOutlineDownloadDone
              className={pickedUp ? "text-secondary" : "text-white"}
            />
          </div>
          <div className="timeline-end timeline-box  shadow-lg hover:shadow-xl duration-300">
            <CiDeliveryTruck className="w-12 h-12 text-secondary mx-auto" />
            <div className="mt-4">
              <h3 className="text-lg tracking-wide">
                {pickedUp ? "Status: Picked Up" : "Status: N/A"}
              </h3>
              <p className="text-sm">
                Picked up date :{" "}
                {pickedUp ? day(pickedUp).format("llll") : "N/A"}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};
export default ParcelInfo;
