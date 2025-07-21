import React, { useEffect, useState } from "react";

const Navbar = () => {
  const NavItems = ["Home", "About", "Services", "Contact"];
  const [menu, setMenu] = useState(false);

  //icon of navbar
  const handleIcon = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div className="flex justify-evenly py-3 bg-blue-600">
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-2xl cursor-pointer text-white">
            Movies World
          </h1>
        </div>
        <div className="hidden md:flex items-center">
          <ul className="flex gap-8 font-bold text-white">
            {NavItems.map((value, index) => (
              <li
                key={index}
                className="hover:text-yellow-500 cursor-pointer hover:border-b-2 hover:transition-all hover:duration-100"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <button className="font-bold  border-2 p-2 rounded-xl bg-orange-400 hover:bg-orange-300 cursor-pointer border-green-600">
            Contact Us
          </button>
        </div>
        {/* Toggle Button for buttons */}
        <div className="flex md:hidden text-white font-bold items-center cursor-pointer ">
          <button onClick={handleIcon}>
            {menu ? <span className="text-white text-3xl">&times;</span> : "☰"}
          </button>
        </div>
      </div>
      <div>
        {/* Mobile menu list items for small devices */}
        <div>
          <ul
            className={`
    md:hidden z-50 
    bg-blue-600 text-white font-bold 
    flex flex-col items-center gap-3 py-4 
    transform transition-transform duration-400 ease-in-out
    ${menu ? "translate-x-0" : "-translate-x-full"}
    fixed top-14 left-0 w-full
  `}
          >
            {NavItems.map((value, index) => (
              <li
                key={index}
                className="hover:text-yellow-500 cursor-pointer hover:border-b-2 hover:transition-all hover:duration-100"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
