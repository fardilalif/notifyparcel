import { services } from "../data.jsx";
import SectionTitle from "./SectionTitle.jsx";
import Service from "./Service.jsx";

const Services = () => {
  return (
    <div className="mt-20">
      <SectionTitle text="our services" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-20">
        {services.map((service) => {
          return <Service key={service.id} service={service} />;
        })}
      </div>
    </div>
  );
};
export default Services;
