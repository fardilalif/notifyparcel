import day from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
day.extend(localizedFormat);

const ParcelsList = () => {
  const { parcels, count } = useLoaderData();
  const [search, setSearch] = useState("");
  const [filteredParcels, setFilteredParcels] = useState(parcels || []);

  const navigate = useNavigate();

  const handleClick = (_id) => {
    return navigate(`/parcels/${_id}`);
  };

  const handleSearch = (e) => {
    const searchKeyword = e.target.value;
    setSearch(searchKeyword);
    const newParcels = parcels.filter((parcel) =>
      parcel.trackingNumber.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredParcels(newParcels);
  };

  return (
    <div>
      <h4 className="mb-4 capitalize text-2xl font-medium">
        total parcels: {count}
      </h4>
      <input
        type="text"
        className="input input-bordered w-full max-w-xs input-sm my-4"
        placeholder="Tracking number"
        value={search}
        onChange={handleSearch}
      />
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* HEAD */}
          <thead>
            <tr>
              <th>Tracking number</th>
              <th>Status</th>
              <th>Created at</th>
              <th>Arrived at</th>
              <th>Picked up at</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel) => {
              const {
                _id,
                trackingNumber,
                status,
                createdAt,
                arrivedAt,
                pickedUp,
              } = parcel;

              const createdDate = createdAt && day(createdAt).format("llll");
              const arrivedDate = arrivedAt && day(arrivedAt).format("llll");
              const pickupDate = pickedUp && day(pickedUp).format("llll");

              return (
                <tr key={_id} onClick={() => handleClick(_id)}>
                  <td>{trackingNumber}</td>
                  <td>{status}</td>
                  <td>{createdDate}</td>
                  <td>{arrivedDate || "not available"}</td>
                  <td>{pickupDate || "not available"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ParcelsList;
