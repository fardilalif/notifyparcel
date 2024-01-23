import {
  AdminParcelsList,
  PaginationContainer,
  SectionTitle,
} from "../components";
import { customFetch } from "./../utils/index";

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
      const response = await customFetch("/parcels", { params });
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
      return null;
    }
  };

const Parcels = () => {
  return (
    <div className="flex flex-col gap-y-4 items-center">
      <SectionTitle text="Parcels" />
      <section>
        <AdminParcelsList />
        <PaginationContainer />
      </section>
    </div>
  );
};
export default Parcels;
