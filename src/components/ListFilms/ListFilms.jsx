import React, { useContext, useEffect, useState, useCallback } from "react";
import { Context } from "../../App";
import ImageViewer from "react-simple-image-viewer";
import { useNavigate } from "react-router-dom";

function ListFilm() {
  const navigate = useNavigate();
  const [context, setContext] = useContext(Context);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [films, setFilms] = useState([]);
  const [end, setEnd] = useState(0);
  const datestring =
    context.getFullYear() +
    "-" +
    ("0" + (context.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + context.getDate()).slice(-2);
  useEffect(() => {
    fetch(`https://api.tvmaze.com/schedule?country=US&date=${datestring}`)
      .then((response) => response.json())
      .then((data) => {
        setFilms(data);
        setEnd(Math.round(data.length / 2));
      });
  }, []);

  const openImageViewer = useCallback((image) => {
    setImages([...images, image]);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setImages([]);
    setIsViewerOpen(false);
  };
  console.log(Math.round(films.length / 2));
  return (
    <>
      <div
        style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        <div>
          {/* <img src="/images/header.png" alt="image" height={90} /> */}
          <div className="header_img">
            <div
              onClick={() => navigate("/")}
              style={{ position: "absolute", left: "25px" }}
            >
              <svg width="13" height="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <path opacity=".87" d="M-5-2h24v24H-5z" />
                  <path
                    fill="#e20b4c"
                    d="M12.51 1.87 10.73.1.84 10l9.9 9.9 1.77-1.77L4.38 10z"
                  />
                </g>
              </svg>
            </div>
            <div className="header_text">Super Film</div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            {context.toLocaleString("ru", {
              month: "long",
              year: "numeric",
              day: "numeric",
            })}
          </div>
          <hr
            size="1"
            noshade="true"
            style={{ width: "100%" }}
            color="#e9e9e9"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            {isViewerOpen && (
              <ImageViewer
                src={images}
                currentIndex={0}
                disableScroll={false}
                closeOnClickOutside={true}
                onClose={closeImageViewer}
              />
            )}
            {films.slice(0, end).map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", margin: "15px 25px 0 25px" }}
              >
                <div style={{ marginRight: 18 }}>
                  <img
                    onClick={() =>
                      openImageViewer(
                        item.show.image
                          ? item.show.image.original
                          : "/images/notFound.png"
                      )
                    }
                    src={
                      item.show.image
                        ? item.show.image.medium
                        : "/images/notFound.png"
                    }
                    width={80}
                    height={120}
                  ></img>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: 120,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>
                    {item.name.slice(0, 60)}
                  </div>
                  <div style={{ color: "#999999" }}>
                    {item.airdate.slice(0, 4)}
                  </div>
                  <div
                    style={{
                      padding: "10px 0px 10px 0px",
                      marginTop: 15,
                      color: "#999999",
                      background: "#f5f5f5",
                      textAlign: "center",
                      fontSize: "14px",
                      borderRadius: "8px",
                      minWidth: 160,
                      maxWidth: 160,
                    }}
                  >
                    Сезон: {item.season} Эпизод: {item.number}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            {films.length !== end && (
              <div
                onClick={() => setEnd((prev) => prev + (films.length - end))}
                className="ghost-button-border-color"
              >
                Еще {films.length - end} сериала
                <svg
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  width={10}
                  height={10}
                  fill="#999999"
                >
                  <path d="M512 588.2 766 334c18.8-18.8 49.2-18.8 67.8 0s18.6 49.2 0 68L546 690c-18.2 18.2-47.4 18.6-66.2 1.4L190 402.2c-9.4-9.4-14-21.8-14-34s4.6-24.6 14-34c18.8-18.8 49.2-18.8 67.8 0l254.2 254z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ListFilm;
