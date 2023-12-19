import { Form, useLocation } from "react-router-dom";
import { colors, prices, sizes } from "../data.jsx";
import FormInput from "./FormInput.jsx";
import FormSelect from "./FormSelect";
import SubmitBtn from "./SubmitBtn.jsx";

const UpdateParcelForm = () => {
  const location = useLocation();
  const parcel = location.state?.parcel;
  const { parcelCode, color, size, serviceCharge } = parcel || {};

  return (
    <Form
      method="POST"
      className="flex flex-col gap-y-4 card w-[80vw] max-w-4xl bg-base-100 shadow-lg hover:shadow-xl p-8"
    >
      <FormInput
        label="parcel code"
        name="parcelCode"
        type="text"
        size="input-sm"
        placeholder="eg: FS01"
        defaultValue={parcelCode}
      />
      <FormSelect
        label="color"
        name="color"
        list={colors}
        size="select-sm"
        defaultValue={color}
      />
      <FormSelect
        label="size"
        name="size"
        list={sizes}
        size="select-sm"
        defaultValue={size}
      />
      <FormSelect
        label="service charge"
        name="serviceCharge"
        list={prices}
        size="select-sm"
        defaultValue={serviceCharge}
      />
      <SubmitBtn size="btn-sm" text="update" width="w-[20rem]" mx="mx-auto" />
    </Form>
  );
};
export default UpdateParcelForm;
