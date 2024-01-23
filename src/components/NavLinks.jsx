import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { links } from "../data";

const NavLinks = () => {
  const user = useSelector((store) => store.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;

        if (
          (url === "dashboard" && !user) ||
          (url === "dashboard" && user?.role === "admin")
        )
          return null;

        if (url === "adminDashboard" && user?.role !== "admin") return null;
        if (url === "parcels" && user?.role !== "admin") return null;
        if (url === "report" && user?.role !== "admin") return null;
        if (url === "report" && user?.role === "admin") {
          return (
            <li key="report" className="dropdown dropdown-end">
              <div tabIndex={1} role="button">
                Report
              </div>
              <ul
                tabIndex={1}
                className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li>
                  <NavLink className="capitalize" to="parcelListArrival">
                    Daily Arrived
                  </NavLink>
                </li>
                <li>
                  <NavLink className="capitalize" to="parcelListPickup">
                    Daily Pickup
                  </NavLink>
                </li>
              </ul>
            </li>
          );
        }

        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
