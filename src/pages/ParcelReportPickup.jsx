import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ParcelsReportList, SearchParcelsForm } from "../components/index.js";
import { customFetch } from "../utils/index.js";

export const loader = async ({ request }) => {
  const date = new URL(request.url).searchParams.get("date");

  if (!date) return null;

  try {
    const response = await customFetch.get(
      `/parcels/getParcelsPickupByDate?date=${date}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error;
    toast.error(errorMessage);
    return null;
  }
};

const ParcelReportPickup = () => {
  return (
    <div className="flex flex-col gap-y-4">
      {/* BREADCRUMBS */}
      <div className="text-sm self-start breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/adminDashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
      <SearchParcelsForm text="Daily parcels pickup" />
      <ParcelsReportList />
    </div>
  );
};
export default ParcelReportPickup;
