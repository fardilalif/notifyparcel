import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { FormInput, SubmitBtn } from "../components";
import { loginUser } from "../features/user/userSlice.js";
import { customFetch } from "./../utils/index";

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (user) {
    toast.success(`Welcome back, ${user.name}`);
    return redirect("/dashboard");
  } else {
    return null;
  }
};

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post("/auth/login", data);
      store.dispatch(loginUser(response.data));
      toast.success("Login successfully");
      if (response.data.user.role === "admin")
        return redirect("/adminDashboard");
      return redirect("/dashboard");
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.error;
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 bg-base-100 shadow-lg p-8 flex flex-col gap-y-4"
      >
        <h4 className="capitalize text-3xl text-center font-bold">login</h4>
        <FormInput label="email" type="email" name="email" />
        <FormInput label="password" type="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <p className="text-center">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="ml-2 capitalize link link-hover link-primary"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
