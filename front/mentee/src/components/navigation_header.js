import { Link } from "react-router-dom";
import { useState } from "react";

import { PrimaryButton } from "./buttons";

// now we import hamberger menu icon from font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

const localLinks = ["Home", "Pricing", "About us", "Contact"];

export default function NavigationHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const hamMenu = () => {
    return (
      <FontAwesomeIcon
        icon={faBars}
        className="text-black text-2xl cursor-pointer"
        onClick={toggleMenu}
      />
    );
  };

  const close = () => {
    return (
      <FontAwesomeIcon
        icon={faClose}
        className="text-black text-2xl cursor-pointer"
        onClick={toggleMenu}
      />
    );
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="nav-container h-200 flex justify-between px-10 items-center lg:ml-40 lg:mr-40 md:ml-30 md:mr-30 sm:ml-8 sm:mr-10  my-20">
      {/* side menu */}
      <div
        className={`side-menu flex flex-col pt-40 items-center gap-20 absolute top-0 left-0 h-screen w-1/2 bg-gray-100 z-10 transition-all duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="w-10 h-10 absolute top-4 right-4"
        >
          {close()}
        </button>
        <div className="logo text-3xl font-bold">Mentee</div>
        <div className="nav-links w-full">
          <ul className="flex flex-col justify-center items-center ">
            {localLinks.map((link) => {
              return (
                <li className="w-full text-center">
                  <Link className="hover:bg-gray-600 hover:text-gray-100 w-full block  py-2 border transition delay-400">
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav-buttons flex gap-4">
          <Link to="/login">
            {" "}
            <PrimaryButton text={"Sign up"} />
          </Link>

          <Link to="/login">
            {" "}
            <PrimaryButton text={"Log in"} />
          </Link>
        </div>
      </div>

      {/* main menu */}

      <div className="flex gap-4 lg:gap-20 items-center">
        <div className="logo text-3xl font-bold">Mentee</div>
        <div className="nav-links hidden md:block">
          <ul className="flex justify-between gap-5 ">
            {localLinks.map((link) => {
              return (
                <li>
                  <Link className="hover:text-blue-900 ">{link}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="nav-buttons hidden md:flex gap-4">
        <Link to="/login">
          {" "}
          <PrimaryButton text={"Sign up"} />
        </Link>

        <Link to="/login">
          {" "}
          <PrimaryButton text={"Log in"} />
        </Link>
      </div>
      <button onClick={toggleMenu} className="p-0 m-0 w-10 h-10 md:hidden">
        {hamMenu()}
      </button>
    </div>
  );
}
