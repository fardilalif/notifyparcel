import aboutusBG from "../assets/about-us.svg";
import SectionTitle from "./SectionTitle.jsx";

const About = () => {
  return (
    <div className="mt-20">
      <SectionTitle text="about us" />
      <div className="grid md:grid-cols-2 gap-2 md:gap-x-6 items-center mt-20">
        <img src={aboutusBG} alt="aboutusbg" className="h-[20rem]" />
        <p className="mt-6 leading-8 max-w-2xl mx-auto">
          Welcome to NotifyParcel, where innovation meets efficiency in the
          realm of parcel management. We understand the pivotal role that
          streamlined logistics play in the success of your business, and we are
          here to revolutionize the way you handle parcels.
        </p>
      </div>
    </div>
  );
};
export default About;
