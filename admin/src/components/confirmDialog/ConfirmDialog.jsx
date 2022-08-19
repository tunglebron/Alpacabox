import React from "react";
import "./confirmDialog.css"

export default function ConfirmDialog({ msg, handleYes, handleNo }) {
  return (
    <div className="confirmDialog">
      <div dangerouslySetInnerHTML={{__html: msg}}></div>
      <div className="confirmation">
        <button className="btn" onClick={handleYes}>Yes</button>
        <button className="btn" onClick={handleNo}>No</button>
      </div>
    </div>
  );
}
