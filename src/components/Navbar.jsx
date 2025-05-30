import React, { useEffect, useState } from "react";

const Navbar = () => {
  const NavItems = ["Home", "About", "Services", "Contact", "Services"];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        document.body.style.backgroundColor("green");
      } else {
        document.body.style.backgroundColor("transparent");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className="flex justify-evenly py-3 mt-3">
        <div>
          <h1 className="font-bold text-2xl cursor-pointer">Logo</h1>
        </div>
        <div>
          <ul className="flex items-center justify-center gap-8 font-bold">
            {NavItems.map((value, index) => (
              <li key={index} className="hover:text-yellow-500 cursor-pointer">
                {value}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button className="font-bold  border-2 p-2 rounded-xl bg-orange-400 hover:bg-orange-300 cursor-pointer border-green-600">
            Contact Us
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
