import { toast } from "react-toastify";
import { ParcelsReportList, SearchParcelsForm } from "../components";
import { customFetch } from "../utils/index.js";

export const loader = async ({ request }) => {
  const date = new URL(request.url).searchParams.get("date");

  if (!date) return null;

  try {
    const response = await customFetch.get(
      `/parcels/getParcelsByDate?date=${date}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error;
    toast.error(errorMessage);
    return null;
  }
};

const ParcelReport = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <SearchParcelsForm />
      <ParcelsReportList />
    </div>
  );
};
export default ParcelReport;
