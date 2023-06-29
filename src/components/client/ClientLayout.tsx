import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Profile from "../../assets/profile.png";

const routerConfig = [
  {
    pathname: "/",
    name: "Home",
  },
  {
    pathname: "/Products",
    name: "Lawyers",
  },
  {
    pathname: "/Contact",
    name: "Active Cases",
  },
  {
    pathname: "/History",
    name: "Case History",
  },
];

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleOptions = () => {
    setIsOptionsOpen(prevState => !prevState);
  }

  return (
    <>
      <nav className="bg-transparent">
        <div className="px-10 py-6 md:px-14 md:py-10 flex items-center justify-between">
          <div className="flex items-center w-full justify-between md:w-auto">
            <NavLink to={"/"}>
              <p className="font-extrabold text-2xl">Find A Lawyer</p>
            </NavLink>
            <button
              onClick={toggleMenu}
              className="md:hidden cursor-pointer text-black text-3xl"
            >
              &#9776;
            </button>
            <div
              id="mobile-menu"
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } md:hidden z-50 absolute top-0 right-[0.5%] text-5xl  flex-col justify-content-center`}
            >
              <nav
                className={`flex flex-col h-screen w-screen bg-gradient-to-br from-blue-200 to-purple-200 items-center space-y-5 py-8 ${
                  isMenuOpen
                    ? "transition-transform duration-500 transform translate-x-0"
                    : "transition-transform duration-500 transform translate-x-full"
                }`}
                aria-label="mobile"
              >
                <button
                  onClick={toggleMenu}
                  className="text-8x1 self-end px-6 text-white font-bold"
                >
                  &times;
                </button>
                {routerConfig.map((route, index) => (
                  <NavLink to={route.pathname} key={index}>
                    <div onClick={toggleMenu}>
                      <p
                        className={`${
                          location.pathname === route.pathname
                            ? "text-xl font-bold"
                            : "scale-100"
                        } text-white text-base`}
                      >
                        {route.name}
                      </p>
                    </div>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <ul className="space-x-10 hidden md:flex">
              {routerConfig.map((route, index) => (
                <li key={index}>
                  <NavLink to={route.pathname}>
                    <div>
                      <p className="text-black lg:text-lg md:text-sm">
                        {route.name}
                      </p>
                      {location.pathname === route.pathname && (
                        <div className="border-[2px] mt-2 rounded-md border-purple-300"></div>
                      )}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="relative hidden md:flex">
              <div
                className="rounded-full w-12 h-12 bg-gray-500 cursor-pointer"
                onClick={toggleOptions}
              >
                <img src={Profile} />
              </div>

              {isOptionsOpen && (
                <div className="absolute top-0 right-0 mt-12 w-40 bg-white rounded shadow">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="container flex flex-col items-center md:items-start md:px-20">
        {children}
      </div>
    </>
  );
};

export default ClientLayout;
