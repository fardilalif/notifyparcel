import { Form } from "react-router-dom";
import FormInput from "./FormInput.jsx";
import SubmitBtn from "./SubmitBtn.jsx";

const AddParcelForm = () => {
  return (
    <div className="bg-base-200 rounded-lg px-8 py-4 max-w-xl mx-auto grid gap-4">
      <h1 className="text-2xl font-medium tracking-wide">
        Receive updates on the status of your parcel? Enter your tracking
        number.
      </h1>
      <Form method="POST" className="grid gap-4">
        <FormInput
          label="tracking number"
          name="trackingNumber"
          type="search"
          size="input-sm"
        />
        <SubmitBtn text="ADD PARCEL" size="btn-sm" />
      </Form>
    </div>
  );
};
export default AddParcelForm;
