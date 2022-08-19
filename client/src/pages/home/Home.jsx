import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Footer from "../../components/footer/Footer";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const Home = ({ type, view }) => {
  const [dynamicAPI, setDynamicAPI] = useState("");
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [element, setElement] = useState(null);

  const prevView = usePreviousValue(view);
  const prevType = usePreviousValue(type);
  const prevGenre = usePreviousValue(genre);

  const watcher = useRef(hasNextPage);

  const resetPagination = () => {
    setLists([]);
    setPageNumber(1);
  };

  const getData = async () => {
    try {
      setLoading(true);
      await axios
        .get(global.proxy + dynamicAPI, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        .then((res) => {
          setLoading(false);
          const result = res.data.result;
          setHasNextPage(result.hasNextPage);
          setLists((prevList) => {
            return [...new Set([...prevList, ...result.data])];
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let api = "";
    if (view === "mylist") {
      if (view !== prevView) resetPagination();
      api =
        "lists/mylist?userId=" +
        JSON.parse(localStorage.getItem("user"))._id +
        "&pageNumber=" +
        pageNumber +
        "&pageLimit=3";
    } else if (type) {
      if (type !== prevType) resetPagination();
      if (genre !== prevGenre) resetPagination();

      api += "lists?type=" + type;

      if (genre !== "-1" && genre !== null) {
        api += "&genre=" + genre;
      }

      api += "&pageNumber=" + pageNumber + "&pageLimit=3";
    } else {
      if (type !== prevType) resetPagination();
      api += "lists/homepage?pageNumber=" + pageNumber + "&pageLimit=3";
    }

    setDynamicAPI(api);
  }, [view, type, genre, pageNumber, prevGenre, prevType, prevView]);

  useEffect(() => {
    if (dynamicAPI !== "") getData();
    // eslint-disable-next-line
  }, [dynamicAPI]);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          if (watcher.current) setPageNumber((prev) => prev + 1);
        }
      },
      { threshold: 0.7 }
    )
  );

  useEffect(() => {
    watcher.current = hasNextPage;
  }, [hasNextPage]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      <div className="main">
        {lists.map((list, index) => {
          if (lists.length === index + 1)
            return (
              <li ref={setElement} key={index}>
                <List list={list} />
              </li>
            );
          else
            return (
              <li key={index}>
                <List list={list} />
              </li>
            );
        })}
        {loading && <div className="noItem">Loading...</div>}
        {lists.length === 0 && <div className="noItem">No items to show</div>}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
