import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever, MdDone } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { Form, Link, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch, formatCurrency, formatDate } from "../utils";
import Modal from "./Modal.jsx";

const AdminParcelsList = () => {
  const loaderData = useLoaderData();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  if (!loaderData) return null;
  const { count, parcels, parcelsPage } = loaderData;
  const [search, setSearch] = useState("");
  const [filteredParcels, setFilteredParcels] = useState(parcelsPage || []);

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

  const updatePickup = async (id) => {
    try {
      setIsLoading(true);
      const response = await customFetch.patch(
        `/parcels/updateParcelPickup/${id}`
      );
      toast.success("Parcel pickup updated");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
      return null;
    }
    return navigate("/adminDashboard");
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
    return navigate("/adminDashboard");
  };

  const handleToggle = () => {
    document.getElementById("delete-parcel-modal-1").showModal();
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-4 capitalize text-2xl font-medium">
        total parcel{count === 1 ? "" : "s"}: {count}
      </h4>

      <div className="flex flex-wrap justify-between items-center mb-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs input-sm"
          placeholder="Tracking number"
          value={search}
          onChange={handleSearch}
        />
        <Link to="/addParcel" className="btn btn-primary btn-sm">
          ADD +
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Tracking number</th>
              <th>Parcel code</th>
              <th>Status</th>
              <th>Color</th>
              <th>Size</th>
              <th>Service charge</th>
              <th>Created at</th>
              <th>Arrived at</th>
              <th>Picked up at</th>
              <th>Name</th>
              <th>Student number</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel) => {
              const {
                _id,
                trackingNumber,
                parcelCode,
                status,
                color,
                size,
                serviceCharge,
                createdAt,
                arrivedAt,
                pickedUp,
              } = parcel;
              const name = parcel?.owner?.name || "";
              const studentNumber = parcel?.owner?.studentNumber || "";

              const createdDate = formatDate(createdAt);
              const arrivedDate = formatDate(arrivedAt);
              const pickupDate = formatDate(pickedUp);
              const formattedCurrency =
                serviceCharge && formatCurrency(serviceCharge);

              return (
                <tr key={_id}>
                  <td>
                    <div className="flex gap-x-2">
                      <Link to={`/updateParcel/${_id}`} state={{ parcel }}>
                        <CiEdit className="w-5 h-5" />
                      </Link>
                      <button
                        className="btn btn-ghost btn-xs"
                        disabled={pickedUp ? 1 : 0}
                        onClick={() => updatePickup(_id)}
                      >
                        {pickedUp ? (
                          <MdDone className="h-5 w-5" />
                        ) : (
                          <TbTruckDelivery className="h-5 w-5" />
                        )}
                      </button>
                      <MdDeleteForever
                        className="h-5 w-5"
                        onClick={() => handleToggle()}
                      />
                    </div>
                    <Modal id="delete-parcel-modal-1">
                      <h3 className="font-bold text-lg">Delete Confirmation</h3>
                      <p className="py-4">
                        Press confirm button to delete this parcel
                      </p>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn btn-neutral">Close</button>
                        </form>
                        <button
                          className="btn btn-primary"
                          onClick={() => deleteParcel(_id)}
                        >
                          Confirm
                        </button>
                      </div>
                    </Modal>
                  </td>
                  <td>{trackingNumber}</td>
                  <td>{parcelCode || "N /A"}</td>
                  <td>{status}</td>
                  <td>{color || "N /A"}</td>
                  <td>{size || "N /A"}</td>
                  <td>{formattedCurrency || "N /A"}</td>
                  <td>{createdDate}</td>
                  <td>{arrivedDate || "N/A"}</td>
                  <td>{pickupDate || "N/A"}</td>
                  <td>{name || "N/A"}</td>
                  <td>{studentNumber || "N /A"}</td>
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
