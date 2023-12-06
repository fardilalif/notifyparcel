import day from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import { CiBoxes, CiDeliveryTruck } from "react-icons/ci";
import {
  MdOutlineCreateNewFolder,
  MdOutlineDownloadDone,
} from "react-icons/md";
import { useLoaderData } from "react-router-dom";
day.extend(localizedFormat);

const ParcelInfo = () => {
  const loaderData = useLoaderData();
  if (!loaderData) return null;
  const {
    parcel: { trackingNumber, status, createdAt, arrivedAt, pickedUp },
  } = loaderData;

  return (
    <section className="flex flex-col gap-y-8 justify-center">
      <h2 className="text-2xl font-medium tracking-wide text-center">
        Your tracking number : {trackingNumber}
      </h2>
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
