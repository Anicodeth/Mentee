import React from "react";
import NavigationHeader from "./navigation_header";
import { Link } from "react-router-dom";

export default function Hero(props) {
  return (
    <div className="hero flex flex-col h-screen">
      <NavigationHeader />
      <div className="hero-content flex flex-col p-20 justify-center align-end gap-20 md:flex-row md:gap-10">
        <div className="headline-content h-full  m-auto ">
          <h1 className="headline text-5xl mb-10">{props.headline}</h1>
          <h2 className="subheadline text-2xl mb-10 ">{props.subheadline}</h2>
          <Link to="/login">
            {" "}
            <button className="flex border border-gray-400 px-4 py-2 rounded hover:bg-gray-700 hover:text-gray-100 transition delay-40 w-40 justify-center">
              {props.getStartedButton}
            </button>{" "}
          </Link>
        </div>
        <div className="hero-image w-100">
          <img src={`${props.heroImage}`} alt="hero" className="" />
        </div>
      </div>
    </div>
  );
}
