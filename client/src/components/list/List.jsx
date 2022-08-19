import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState, useEffect } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

export default function List({ list }) {
  //const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(
    Math.floor(window.innerWidth / 230)
  );

  const listRef = useRef();

  useEffect(() => {
    if (list.hasOwnProperty("content")) {
      if (list.content.length <= Math.floor(window.innerWidth / 230))
        setClickLimit(0);
      else
        setClickLimit(
          list.content.length - Math.floor(window.innerWidth / 230)
        );
    }
  }, [list]);

  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      {list && (
        <>
          <span className="listTitle">{list.title}</span>
          <div className="wrapper">
            <ArrowBackIosOutlined
              className="sliderArrow left"
              onClick={() => handleClick("left")}
              style={{ display: slideNumber === 0 && "none" }}
            />
            <div className="container" ref={listRef}>
              {list.hasOwnProperty("content") &&
                list.content.map((item, index) => (
                  <ListItem key={index} index={index} item={item.value} />
                ))}
            </div>
            <ArrowForwardIosOutlined
              className="sliderArrow right"
              onClick={() => handleClick("right")}
              style={{ display: slideNumber === clickLimit && "none" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
