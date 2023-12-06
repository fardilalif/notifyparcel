const Service = ({ service }) => {
  const { title, description, icon } = service;
  return (
    <div className="card py-6 px-2 w-full bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
      {icon}
      <div className="card-body">
        <h2 className="card-title capitalize tracking-wider">{title}</h2>
        <p className="capitalize leading-8 mt-4">{description}</p>
      </div>
    </div>
  );
};
export default Service;
