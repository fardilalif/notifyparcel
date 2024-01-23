import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ParcelsReportList, SearchParcelsForm } from "../components/index.js";
import { customFetch } from "../utils/index.js";

export const loader = async ({ request }) => {
  const date = new URL(request.url).searchParams.get("date");

  if (!date) return null;

  try {
    const response = await customFetch.get(
      `/parcels/getParcelsArrivalByDate?date=${date}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error;
    toast.error(errorMessage);
    return null;
  }
};

const ParcelReportArrival = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <SearchParcelsForm
        text="Daily 
      parcels arrival"
      />
      <ParcelsReportList />
    </div>
  );
};
export default ParcelReportArrival;
