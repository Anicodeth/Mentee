import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";

export default function NavigationHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const ham = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    );
  };

  const close = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          className="text-black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
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
            <li className="w-full text-center">
              <Link className="hover:bg-gray-600 hover:text-gray-100 w-full block  py-2 border transition delay-400">
                Home
              </Link>
            </li>
            <li className="w-full text-center">
              <Link className="hover:bg-gray-600 hover:text-gray-100 w-full block  py-2 border transition delay-400">
                Pricing
              </Link>
            </li>
            <li className="w-full text-center">
              <Link className="hover:bg-gray-600 hover:text-gray-100 w-full block  py-2 border transition delay-400">
                About us
              </Link>
            </li>
            <li className="w-full text-center">
              <Link className="hover:bg-gray-600 hover:text-gray-100 w-full block  py-2 border transition delay-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-buttons">
          {/* We are using tailwind css*/}
          <Link to="/login">
            {" "}
            <button className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-600 hover:text-gray-100 transition delay-40 mr-2">
              Sign up
            </button>
          </Link>

          <Link to="/login">
            {" "}
            <button className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-600 hover:text-gray-100 transition delay-40">
              Log in
            </button>
          </Link>
        </div>
      </div>

      {/* main menu */}

      <div className="flex gap-4 lg:gap-20 items-center">
        <div className="logo text-3xl font-bold">Mentee</div>
        <div className="nav-links hidden md:block">
          <ul className="flex justify-between gap-5 ">
            <li>
              <Link className="hover:text-blue-900 ">Home</Link>
            </li>
            <li>
              <Link className="hover:text-blue-900 ">Pricing</Link>
            </li>
            <li>
              <Link className="hover:text-blue-900 ">About us</Link>
            </li>
            <li>
              <Link className="hover:text-blue-900 ">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="nav-buttons hidden md:block">
        {/* We are using tailwind css*/}
        <Link to="/login">
          {" "}
          <button className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-600 hover:text-gray-100 transition delay-40 mr-2">
            Sign up
          </button>
        </Link>

        <Link to="/login">
          {" "}
          <button className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-600 hover:text-gray-100 transition delay-40">
            Log in
          </button>
        </Link>
      </div>
      <button onClick={toggleMenu} className="p-0 m-0 w-10 h-10 md:hidden">
        {ham()}
      </button>
    </div>
  );
}
