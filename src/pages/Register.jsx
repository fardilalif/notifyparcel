import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "./../utils/index";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/auth/register", data);
    console.log(response);
    toast.success("Account created. Please check your email for verification");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error;
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 bg-base-100 shadow-lg p-8 flex flex-col gap-y-4"
      >
        <h4 className="capitalize text-3xl text-center font-bold">register</h4>
        <FormInput label="email" type="email" name="email" />
        <FormInput label="name" type="text" name="name" />
        <FormInput label="student number" type="text" name="studentNumber" />
        <FormInput label="password" type="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center">
          Already a member?{" "}
          <Link
            to="/login"
            className="ml-2 capitalize link link-hover link-primary"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
