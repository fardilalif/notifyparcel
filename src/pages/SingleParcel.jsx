import { Link } from "react-router-dom";
import { ParcelInfo } from "../components";
import { customFetch } from "../utils/index.js";

export const loader = async ({ params }) => {
  const { id } = params;

  try {
    const response = await customFetch.get(`/parcels/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error;
    toast.error(errorMessage);
    return null;
  }
};

const SingleParcel = () => {
  return (
    <section>
      {/* BREADCRUMBS */}
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
      <ParcelInfo />
    </section>
  );
};
export default SingleParcel;
