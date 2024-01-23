import { Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { AddParcelFormAdmin, SectionTitle } from "../components";
import { customFetch } from "../utils/index.js";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/parcels", data);
    toast.success("Parcel added successfully");
    return redirect("/parcels");
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error;
    toast.error(errorMessage);
    return null;
  }
};

const AddParcel = () => {
  return (
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <SectionTitle text="Create parcel" />
      <AddParcelFormAdmin />
    </div>
  );
};
export default AddParcel;
