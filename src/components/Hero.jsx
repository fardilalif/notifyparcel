import heroBg from "../assets/hero-bg.svg";

const Hero = () => {
  return (
    <div className="grid md:grid-cols-2 gap-20 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Notify Parcel
        </h1>
        <h2 className="mt-8 max-w-xl text-2xl sm:text-3xl leading-8">
          Where Parcel Management Made Ease.
        </h2>
      </div>
      <div>
        <img src={heroBg} alt="hero-bg" className="h-[15rem] " />
      </div>
    </div>
  );
};
export default Hero;
