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
import { groupBy } from "../utils/index.js";

const Chart = () => {
  const loaderData = useLoaderData();
  if (!loaderData) return null;
  const { parcels } = loaderData;

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
