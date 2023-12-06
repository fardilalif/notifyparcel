import { Form } from "react-router-dom";
import FormInput from "./FormInput.jsx";
import SubmitBtn from "./SubmitBtn.jsx";

const SearchParcelForm = () => {
  return (
    <div className="bg-base-200 rounded-lg px-8 py-4 w-full max-w-xl mx-auto grid gap-4">
      <h1 className="text-2xl font-medium tracking-wide">Find your parcel</h1>
      <Form className="grid gap-4">
        <FormInput
          label="tracking number"
          name="trackingNumber"
          type="search"
          size="input-sm"
        />
        <SubmitBtn text="SEARCH PARCEl" size="btn-sm" />
      </Form>
    </div>
  );
};
export default SearchParcelForm;
