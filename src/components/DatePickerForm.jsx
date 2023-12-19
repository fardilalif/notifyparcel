import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const DatePickerForm = ({ name }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const date = searchParams.get("date");

  return (
    <input
      type="date"
      name={name}
      className="py-2 px-4 rounded-lg"
      defaultValue={date}
    />
  );
};
export default DatePickerForm;
