const FormCheckbox = ({ label, name, size }) => {
  return (
    <div className="form-control">
      <label htmlFor={label} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        className={`checkbox checkbox-primary ${size}`}
        name={name}
      />
    </div>
  );
};
export default FormCheckbox;
