import { toast } from "react-toastify";
import { ParcelInfo, SearchParcelForm } from "../components";
import { customFetch } from "../utils/index.js";

export const loader = async ({ request }) => {
  const trackingNumber = new URL(request.url).searchParams.get(
    "trackingNumber"
  );

  if (!trackingNumber) return null;

  try {
    const response = await customFetch.get(
      `/parcels/trackingNumber/${trackingNumber}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error;
    toast.error(errorMessage);
    return null;
  }
};

const Tracking = () => {
  return (
    <section className="flex flex-col gap-y-8">
      <SearchParcelForm />
      <ParcelInfo />
    </section>
  );
};
export default Tracking;
