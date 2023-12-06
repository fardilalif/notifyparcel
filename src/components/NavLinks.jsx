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
