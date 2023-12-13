import { Form } from "react-router-dom";
import FormInput from "./FormInput.jsx";
import SubmitBtn from "./SubmitBtn.jsx";

const AddParcelForm = ({ text }) => {
  return (
    <div className="bg-base-200 shadow-lg hover:shadow-xl rounded-lg px-8 py-4 max-w-xl mx-auto grid gap-4">
      {text && <h1 className="text-xl font-medium tracking-wide">{text}</h1>}
      <Form method="POST" className="grid gap-4">
        <FormInput
          label="tracking number"
          name="trackingNumber"
          type="search"
          size="input-sm"
        />
        <SubmitBtn text="ADD PARCEL" size="btn-sm" btnBlock="btn-block" />
      </Form>
    </div>
  );
};

export default AddParcelForm;
