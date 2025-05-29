import React, { useEffect, useState } from "react";

const Navbar = () => {
  const NavItems = ["Home", "About", "Services", "Contact", "Services"];

  return (
    <>
      <div className="flex justify-evenly py-3">
        <div>
          <h1 className="font-bold text-2xl cursor-pointer">Logo</h1>
        </div>
        <div>
          <ul className="text-black flex gap-4">
            {NavItems.map((value, index) => (
              <div key={index}>{value}</div>
            ))}
          </ul>
        </div>
        <div>
          <button>Contact</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
