const Modal = ({ children, id }) => {
  return (
    <dialog id={id} className={`modal modal-bottom sm:modal-middle`}>
      <div className="modal-box">{children}</div>
    </dialog>
  );
};
export default Modal;
