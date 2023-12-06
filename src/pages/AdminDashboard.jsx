import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminParcelsList, PaginationContainer } from "../components";
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
    <div>
      <AdminParcelsList />
      <PaginationContainer />
    </div>
  );
};

export default AdminDashboard;
