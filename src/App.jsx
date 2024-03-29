import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  AddParcel,
  AdminDashboard,
  Error,
  HomeLayout,
  Landing,
  Login,
  ParcelReportArrival,
  ParcelReportPickup,
  Parcels,
  Register,
  SingleParcel,
  Tracking,
  UpdateParcel,
  UserDashboard,
  VerifyAccount,
} from "./pages";

// action
import { action as addParcelActionAdmin } from "./pages/AddParcel.jsx";
import { action as loginAction } from "./pages/Login.jsx";
import { action as registerAction } from "./pages/Register.jsx";
import { action as updateParcelAction } from "./pages/UpdateParcel.jsx";
import { action as addParcelAction } from "./pages/UserDashboard.jsx";
import { action as verifyAccountAction } from "./pages/VerifyAccount.jsx";

// loader
import { loader as adminDashboardLoader } from "./pages/AdminDashboard.jsx";
import { loader as loginLoader } from "./pages/Login.jsx";
import { loader as parcelArrivalLoader } from "./pages/ParcelReportArrival.jsx";
import { loader as parcelPickupLoader } from "./pages/ParcelReportPickup.jsx";
import { loader as parcelsLoader } from "./pages/Parcels.jsx";
import { loader as singleParcelLoader } from "./pages/SingleParcel.jsx";
import { loader as trackingLoader } from "./pages/Tracking.jsx";
import { loader as userDashboardLoader } from "./pages/UserDashboard.jsx";

//store
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "dashboard",
        element: <UserDashboard />,
        loader: userDashboardLoader(store),
        action: addParcelAction,
      },
      {
        path: "adminDashboard",
        element: <AdminDashboard />,
        loader: adminDashboardLoader(store),
      },
      {
        path: "parcels",
        element: <Parcels />,
        loader: parcelsLoader(store),
      },
      {
        path: "parcels/:id",
        element: <SingleParcel />,
        loader: singleParcelLoader,
      },
      {
        path: "tracking",
        element: <Tracking />,
        loader: trackingLoader,
      },
      {
        path: "updateParcel/:id",
        element: <UpdateParcel />,
        action: updateParcelAction,
      },
      {
        path: "addParcel",
        element: <AddParcel />,
        action: addParcelActionAdmin,
      },
      {
        path: "parcelListArrival",
        element: <ParcelReportArrival />,
        loader: parcelArrivalLoader,
      },
      {
        path: "parcelListPickup",
        element: <ParcelReportPickup />,
        loader: parcelPickupLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
    loader: loginLoader(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
  {
    path: "/verifyAccount",
    element: <VerifyAccount />,
    errorElement: <Error />,
    action: verifyAccountAction,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
