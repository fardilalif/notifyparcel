const FormInput = ({
  label,
  name,
  type,
  size,
  step,
  min,
  max,
  placeholder,
  defaultValue,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        className={`input input-bordered ${size}`}
        defaultValue={defaultValue}
      />
    </div>
  );
};
export default FormInput;
