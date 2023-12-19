import day from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import { useState } from "react";
import { BiSolidDetail } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils/index.js";
import Modal from "./Modal.jsx";
day.extend(localizedFormat);

const ParcelsList = () => {
  const { count, parcels, parcelsPage } = useLoaderData();
  const [search, setSearch] = useState("");
  const [modalData, setModalData] = useState("");
  const [filteredParcels, setFilteredParcels] = useState(parcelsPage || []);
  const navigate = useNavigate();

  const handleToggle = (id, trackingNumber) => {
    setModalData(id);
    document.getElementById("delete-parcel-modal").showModal();
  };

  const handleDetailClick = (_id) => {
    return navigate(`/parcels/${_id}`);
  };

  const handleSearch = (e) => {
    const searchKeyword = e.target.value;
    setSearch(searchKeyword);
    if (searchKeyword === "") {
      setFilteredParcels(parcelsPage);
      return;
    }
    const newParcels = parcels.filter((parcel) =>
      parcel.trackingNumber.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredParcels(newParcels);
  };

  const deleteParcel = async (id) => {
    try {
      const response = await customFetch.delete(`/parcels/${id}`);
      toast.success("Parcel deleted successfully");
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
      return null;
    }
    return navigate("/dashboard");
  };

  return (
    <div>
      <h4 className="mb-4 capitalize text-2xl font-medium">
        total parcel{count === 1 ? "" : "s"}: {count}
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
              <th></th>
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
                <tr key={_id}>
                  <td>{trackingNumber}</td>
                  <td>{status}</td>
                  <td>{createdDate}</td>
                  <td>{arrivedDate || "N/A"}</td>
                  <td>{pickupDate || "N/A"}</td>
                  <td>
                    <div className="flex gap-x-4">
                      <BiSolidDetail
                        className="h-5 w-5"
                        onClick={() => handleDetailClick(_id)}
                      />
                      {status === "created" ? (
                        <MdDeleteForever
                          className="h-5 w-5"
                          onClick={() => handleToggle(_id)}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal id="delete-parcel-modal">
          <h3 className="font-bold text-lg">Delete Confirmation</h3>
          <p className="py-4">Press confirm button to delete this parcel</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-neutral">Close</button>
            </form>
            <button
              className="btn btn-primary"
              onClick={() => deleteParcel(modalData)}
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default ParcelsList;
