import React from "react";
import "./loaderBox.css";

export default function LoaderBox() {
  const items = [
    "https://i.pinimg.com/564x/3b/6f/fb/3b6ffbdc2ef00f64bd7484c15801bcb9.jpg",
    "https://i.pinimg.com/736x/5a/8a/55/5a8a5552e9b659364b400744b893e5a7.jpg",
    "https://i.pinimg.com/564x/c8/ee/eb/c8eeeb5e44c0a861e1d7f68aafb492ac.jpg",
    "https://i.pinimg.com/originals/5f/e4/5c/5fe45c1bd0162cc1a40e096ae1d33831.jpg",
    "https://pbs.twimg.com/media/CKsaqZPUkAAvAr1.jpg"
  ];

  const item = items[Math.floor(Math.random() * items.length)];
  return (
    <div className="loaderBox">
      <div className="loader">
        <span className="box"></span>
        <span className="box"></span>
        <div className="code">
          <img src={item} width="120px" alt="" />
        </div>
        <span className="txt">LOADING...</span>
      </div>
    </div>
  );
}
