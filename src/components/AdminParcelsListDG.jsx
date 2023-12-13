import { DataGrid } from "@mui/x-data-grid";
import { useLoaderData } from "react-router-dom";

const AdminParcelsListDG = () => {
  const loaderData = useLoaderData();
  if (!loaderData) return null;
  const { parcels } = loaderData;

  const columns = [
    { field: "trackingNumber", headerName: "Tracking Number", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    { field: "createdAt", headerName: "Created Date", width: 200 },
    { field: "arrivedAt", headerName: "Arrived Date", width: 200 },
    { field: "pickup", headerName: "Pickup Date", width: 200 },
  ];

  const rows = parcels.map((parcel) => {
    return { ...parcel, id: parcel._id };
  });

  return (
    <div className="h-80 w-full">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowClassName={(params) => `color: "white`}
      />
    </div>
  );
};
export default AdminParcelsListDG;
