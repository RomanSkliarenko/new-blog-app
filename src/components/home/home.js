import React from "react";
import hello from "../../images/hello.gif";
import style from "./home.module.css";

export default function Home() {
  return (
    <div className={style.container}>
      <h2>
        Welcome page of our service <img src={hello} alt="greeting"></img>
      </h2>
    </div>
  );
}
