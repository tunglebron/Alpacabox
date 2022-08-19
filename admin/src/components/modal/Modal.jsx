import React, { useState, forwardRef, useImperativeHandle } from "react";
import "./modal.css";

const Modal = forwardRef((props, ref) => {
  const [modalState, setModalState] = useState("my-modal display-none");

  useImperativeHandle(ref, () => ({
    handleShow() {
      setModalState("my-modal display-flex");
      // to make the transition effect take place
      setTimeout(() => {
        setModalState("my-modal my-modal--show display-flex");
      }, 15); // 15 is the minimum timeout value for a wide variety of browsers for the transitions to occur

      // to make the body unscrollable!
      document.body.style.overflow = "hidden";
    },

    handleClose() {
      setModalState("my-modal display-inline-flex");

      // display none the modal after making the animation and restore the default body style
      window.setTimeout(() => {
        setModalState("my-modal display-none");
        document.body.style.overflow = "auto";
      }, 450);
    },
  }));

  function handleClose() {
    setModalState("my-modal display-inline-flex");

    // display none the modal after making the animation and restore the default body style
    window.setTimeout(() => {
      setModalState("my-modal display-none");
      document.body.style.overflow = "auto";
    }, 450);
  }

  return (
    <div className="modal-root">
      <div
        className={modalState}
        onClick={handleClose}
        onKeyDown={(evt) => {
          if (evt.code === 27) handleClose();
        }}
      >
        <div className="my-modal__content">{props.children}</div>
      </div>
    </div>
  );
});

export default Modal;
