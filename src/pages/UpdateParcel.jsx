import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { SectionTitle, UpdateParcelForm } from "../components";
import { customFetch } from "../utils/index.js";

export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const id = params.id;

  try {
    const response = await customFetch.patch(
      `/parcels/updateParcelArrived/${id}`,
      data
    );
    toast.success("Parcel updated successfully");
    return redirect("/adminDashboard");
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error;
    toast.error(errorMessage);
    return null;
  }
};

const UpdateParcel = () => {
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center">
      <SectionTitle text="Update parcel information" />
      <UpdateParcelForm />
    </div>
  );
};
export default UpdateParcel;
