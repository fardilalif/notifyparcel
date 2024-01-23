import { Form, useLocation } from "react-router-dom";
import { colors, prices, sizes } from "../data.jsx";
import FormInput from "./FormInput.jsx";
import FormSelect from "./FormSelect.jsx";
import SubmitBtn from "./SubmitBtn.jsx";

const AddParcelFormAdmin = () => {
  const location = useLocation();
  const trackingNumber = location.state?.trackingNumber;

  return (
    <Form
      method="POST"
      className="flex flex-col gap-y-4 card w-[80vw] max-w-4xl bg-base-100 shadow-lg hover:shadow-xl p-8"
    >
      <FormInput
        label="tracking number"
        name="trackingNumber"
        type="text"
        size="input-sm"
        placeholder="eg: JNT128323"
        defaultValue={trackingNumber}
      />
      <FormInput
        label="parcel code"
        name="parcelCode"
        type="text"
        size="input-sm"
        placeholder="eg: FS01"
      />
      <FormSelect label="color" name="color" list={colors} size="select-sm" />
      <FormSelect label="size" name="size" list={sizes} size="select-sm" />
      <FormSelect
        label="service charge"
        name="serviceCharge"
        list={prices}
        size="select-sm"
      />
      <SubmitBtn size="btn-sm" text="update" />
    </Form>
  );
};
export default AddParcelFormAdmin;
