import { redirect, useLoaderData, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { BarChart, DashboardSummary } from "../components";
import { customFetch } from "../utils/index.js";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user || user?.role !== "admin") {
      toast.warn("Unauthorized to access this route");
      return redirect("/");
    }

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await customFetch.get("/parcels", { params });
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
      return null;
    }
  };

const AdminDashboard = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="w-full h-96 text-center mb-16">
        <h2 className="b-4 capitalize text-2xl font-medium mb-4">
          Parcels Status
        </h2>
        <BarChart />
      </div>
      <DashboardSummary />
    </div>
  );
};

export default AdminDashboard;
