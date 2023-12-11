import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { customFetch, groupBy } from "../utils/index.js";

const Chart = () => {
  const loaderData = useLoaderData();
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const getParcels = async () => {
      try {
        const response = await customFetch.get("/parcels");
        setParcels(response.data.parcels);
      } catch (error) {
        console.log(error);
        const errorMessage = error?.response?.data?.error;
        toast.error(errorMessage);
        return null;
      }
    };

    getParcels();
  }, [loaderData]);

  const groupedData = groupBy(parcels, "status");
  const refinedData = [
    { status: "created", count: groupedData?.created?.length || 0 },
    { status: "arrived", count: groupedData?.arrived?.length || 0 },
    { status: "pickup", count: groupedData?.pickup?.length || 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={refinedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="status" className="capitalize" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Chart;
