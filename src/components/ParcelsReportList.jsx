import { useLoaderData } from "react-router-dom";
import { formatCurrency, formatDate } from "../utils/index.js";

const ParcelsReportList = () => {
  const loaderData = useLoaderData();
  if (!loaderData) return;
  const { parcels } = loaderData;
  let count = 0;

  return (
    <div>
      <h4 className="mb-4 capitalize text-2xl font-medium">
        total parcels: {parcels.length}
      </h4>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>No</th>
              <th>Tracking number</th>
              <th>Parcel code</th>
              <th>Status</th>
              <th>Color</th>
              <th>Size</th>
              <th>Arrived at</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => {
              const {
                _id,
                trackingNumber,
                parcelCode,
                status,
                color,
                size,
                arrivedAt,
              } = parcel;
              const name = parcel?.owner?.name || "";

              const arrivedDate = formatDate(arrivedAt);

              return (
                <tr key={_id}>
                  <td>{++count}</td>
                  <td>{trackingNumber}</td>
                  <td>{parcelCode || "N /A"}</td>
                  <td>{status}</td>
                  <td>{color || "N /A"}</td>
                  <td>{size || "N /A"}</td>
                  <td>{arrivedDate || "N/A"}</td>
                  <td>{name || "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ParcelsReportList;
