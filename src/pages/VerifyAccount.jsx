import { Form, redirect, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import SubmitBtn from "../components/SubmitBtn.jsx";
import { customFetch } from "../utils/index.js";

export const action = async ({ request }) => {
  const data = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const response = await customFetch.post(`/auth/verify-email`, data);
    console.log(response);
    toast.success("Account verified!");
    return redirect("/login");
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.error;
    toast.error(errorMessage);
    return null;
  }
};

const VerifyAccount = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 bg-base-100 shadow-lg p-8 flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Verify your account</h4>
        <SubmitBtn text="VERIFY ACCOUNT" />
      </Form>
    </section>
  );
};
export default VerifyAccount;
