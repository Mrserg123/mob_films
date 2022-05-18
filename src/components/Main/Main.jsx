import React, { useContext } from "react";
import Calendar from "react-calendar";
import { useState } from "react";
import { Context } from "../../App";
import "./style.css";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  // const [value, onChange] = useState(new Date());
  const [context, setContext] = useContext(Context);
  function changeDate(date) {
    setContext(date);
    navigate("films");
  }
  console.log(context);
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <div>
        {/* <img src="/images/header.png" alt="image" height={90} /> */}
        <div className="header_img">
          <div className="header_text">Super Film</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ marginTop: "40px" }}>
            <img src="/images/tv.png" alt="tv" width={150} height={120} />
          </div>
          <div
            style={{ width: "250px", textAlign: "center", marginTop: "20px" }}
          >
            Для получения списка сериалов, пожалуйста, выберите необходимый
            месяц и день.
          </div>
        </div>
      </div>
      <div
        style={{
          margin: "auto 0 0 0",
        }}
      >
        <Calendar
          onChange={changeDate}
          value={context}
          prev2Label={null}
          next2Label={null}
        />
      </div>
    </div>
  );
}
export default Main;
