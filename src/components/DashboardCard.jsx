const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
      <div className="card-body justify-between">
        <div className="card-title text-sm font-normal">{title}</div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-medium">{value}</h2>
          {icon}
        </div>
      </div>
    </div>
  );
};
export default DashboardCard;
