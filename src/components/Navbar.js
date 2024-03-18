import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

function Navbar() {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#75aadb] m-4 text-left">
        Futbol Argentino
      </h1>
      <ul className="hidden md:flex">
        <li className="p-4 hover:underline"><Link className="nav-link " to="/">Home</Link></li>
        <li className="p-4 hover:underline"><Link className="nav-link " to="/leaderboard">Leaderboard</Link></li>
      </ul>
      <div className=" block md:hidden" onClick={handleNav}>
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[50%] h-full border-r border-r-gray-900 bg-gray-800 ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#75aadb] m-4">
          Futbol Argentino
        </h1>
        <ul className="pt-4">
          <li className="p-4 border-b border-gray-600">
            <Link className="hover:underline " to="/">Home</Link>
          </li>
          <li className="p-4">
            <Link className="hover:underline" to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
