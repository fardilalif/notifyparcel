import { useState } from "react";
import { Form } from "react-router-dom";
import DatePickerForm from "./DatePickerForm";
import SubmitBtn from "./SubmitBtn.jsx";

const SearchParcelsForm = () => {
  return (
    <div className="bg-base-200 rounded-lg px-8 py-4 w-full max-w-xl mx-auto grid gap-4">
      <h1 className="text-xl font-medium tracking-wide">
        Display parcels for selected date
      </h1>
      <Form className="grid gap-4">
        <DatePickerForm name="date" />
        <SubmitBtn text="SEARCH PARCEl" size="btn-sm" btnBlock="btn-block" />
      </Form>
    </div>
  );
};
export default SearchParcelsForm;
