import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AddParcelForm, PaginationContainer, ParcelsList } from "../components";
import { customFetch } from "../utils/index.js";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn("You must be logged in first");
      return redirect("/login");
    }
    if (user?.role === "admin") return redirect("/adminDashboard");

    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    try {
      const response = await customFetch("/parcels/getCurrentUserParcels", {
        params,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
      return null;
    }
  };

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/parcels", data);
    toast.success("Parcel added successfully");
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error;
    toast.error(errorMessage);
    return null;
  }
};

const UserDashboard = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <AddParcelForm
        text="Receive updates status of your parcel by entering your tracking
        number."
      />
      <ParcelsList />
      <PaginationContainer />
    </div>
  );
};
export default UserDashboard;
