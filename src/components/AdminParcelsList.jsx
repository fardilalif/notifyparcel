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
  if (!loaderData) return null;
  const { count, parcels, parcelsPage } = loaderData;
  const navigate = useNavigate();
  const [modalData, setModalData] = useState("");
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
    return navigate("/parcels");
  };

  const deleteParcel = async (id) => {
    console.log(id);
    try {
      const response = await customFetch.delete(`/parcels/${id}`);
      toast.success("Parcel deleted successfully");
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
      return null;
    }
    return navigate("/parcels");
  };

  const handleDelete = (id) => {
    setModalData(id);
    document.getElementById("delete-parcel-modal-1").showModal();
  };

  const handlePickup = (id) => {
    setModalData(id);
    document.getElementById("pickup-parcel-modal").showModal();
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

      <div className="flex justify-between items-center mb-4 gap-x-2">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs input-sm"
          placeholder="Tracking number"
          value={search}
          onChange={handleSearch}
        />
        <Link
          to="/addParcel"
          state={{ trackingNumber: search }}
          className="btn btn-primary btn-sm"
        >
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
              const formattedCurrency = formatCurrency(serviceCharge);

              return (
                <tr key={_id}>
                  <td>
                    <div className="flex gap-x-2">
                      <button className="btn btn-ghost btn-sm hover:cursor-pointer">
                        <Link
                          to={`/updateParcel/${_id}`}
                          state={{ parcel }}
                          className="hover:cursor-pointer"
                        >
                          <CiEdit className="w-5 h-5" />
                        </Link>
                      </button>
                      <button
                        className="btn btn-ghost btn-xs hover:cursor-pointer"
                        disabled={
                          arrivedAt === undefined || pickedUp ? true : false
                        }
                        onClick={() => handlePickup(_id)}
                      >
                        {pickedUp ? (
                          <MdDone className="h-5 w-5" />
                        ) : (
                          <TbTruckDelivery className="h-5 w-5" />
                        )}
                      </button>
                      <button className="btn btn-ghost btn-sm hover:cursor-pointer">
                        <MdDeleteForever
                          className="h-5 w-5"
                          onClick={() => handleDelete(_id)}
                        />
                      </button>
                    </div>
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
        <Modal id="delete-parcel-modal-1">
          <h3 className="font-bold text-lg">Delete Confirmation</h3>
          <p className="py-4">Press confirm button to delete this parcel</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button
              className="btn btn-primary"
              onClick={() => deleteParcel(modalData)}
            >
              Confirm
            </button>
          </div>
        </Modal>
        <Modal id="pickup-parcel-modal">
          <h3 className="font-bold text-lg">Pickup confirmation</h3>
          <p className="py-4">Press confirm button to update pickup</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button
              className="btn btn-primary"
              onClick={() => updatePickup(modalData)}
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default AdminParcelsList;
