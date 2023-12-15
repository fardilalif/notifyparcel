import { Link, useRouteError } from "react-router-dom";
import img from "../assets/error-img.svg";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <div className="h-screen w-[90vw] mx-auto text-center flex items-center justify-center">
        <div>
          <img src={img} alt="error" className="w-[90vw] max-w-2xl block" />
          <h3 className="text-4xl tracking-wider font-bold my-4">Ohh!</h3>
          <p className="text-xl leading-7 mt-6">
            We can't seem to find the page you're looking for
          </p>
          <Link to="/" className="capitalize btn btn-primary text-xl mt-6">
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="grid min-h-[100vh] place-items-center px-8">
      <h4 className="text-center font-bold text-4xl">There was an error...</h4>
    </main>
  );
};
export default Error;
