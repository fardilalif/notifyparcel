import { useNavigation } from "react-router-dom";

const SubmitBtn = ({ text, size, width, btnBlock, mx }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn btn-primary btn-block uppercase ${size} ${btnBlock}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner">sending...</span>
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};
export default SubmitBtn;
