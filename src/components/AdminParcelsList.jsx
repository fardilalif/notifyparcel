import day from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils/index.js";
import { statuses } from "./../data";
day.extend(localizedFormat);

const AdminParcelsList = () => {
  const loaderData = useLoaderData();
  if (!loaderData) return null;
  const { count, parcels } = loaderData;
  const [search, setSearch] = useState("");
  const [filteredParcels, setFilteredParcels] = useState(parcels || []);

  const handleSearch = (e) => {
    const searchKeyword = e.target.value;
    setSearch(searchKeyword);
    const newParcels = parcels.filter((parcel) =>
      parcel.trackingNumber.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredParcels(newParcels);
  };

  const updateParcel = async ({ id, value }) => {
    if (value === "arrived") {
      try {
        const response = await customFetch.patch(
          `/parcels/updateParcelArrived/${id}`
        );
        toast.success("Parcel arrival updated");
        console.log(response.data);
      } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.error;
        toast.error(errorMessage);
        return null;
      }
    }
    if (value === "pickup") {
      try {
        const response = await customFetch.patch(
          `/parcels/updateParcelPickup/${id}`
        );
        toast.success("Parcel picked up updated");
        console.log(response.data);
      } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.error;
        toast.error(errorMessage);
        return null;
      }
    }
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
          <thead>
            <tr>
              <th>Tracking number</th>
              <th>Status</th>
              <th>Created at</th>
              <th>Arrived at</th>
              <th>Picked up at</th>
              <th>Owner</th>
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
                owner: { name },
              } = parcel;

              const createdDate = createdAt && day(createdAt).format("llll");
              const arrivedDate = arrivedAt && day(arrivedAt).format("llll");
              const pickupDate = pickedUp && day(pickedUp).format("llll");

              return (
                <tr key={_id}>
                  <td>{trackingNumber}</td>
                  <td>
                    <select
                      className="select select-bordered w-full max-w-xs select-xs"
                      onChange={(e) =>
                        updateParcel({ id: _id, value: e.target.value })
                      }
                      defaultValue={status}
                    >
                      {statuses.map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>{createdDate}</td>
                  <td>{arrivedDate || "not available"}</td>
                  <td>{pickupDate || "not available"}</td>
                  <td>{name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminParcelsList;
