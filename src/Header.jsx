import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import k from "./assest/download.png";
import icon from "./assest/download (2).png";
import Grocery from "./assest/grocery.png";
import { useState } from "react";
export const Header = ({ setSidebarOpen, sidebarOpen }) => {
  const handleClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  /* ---------------- CART COUNT ---------------- */
  const reduxCart = useSelector((state) => state.task.task);
  const localCart = JSON.parse(localStorage.getItem("cart"));
  const cartCount = localCart ? localCart.length : reduxCart.length;

  /* ---------------- USER AUTH ---------------- */
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const firstLetter = name ? name.charAt(0).toUpperCase() : "";
const [dropdownOpen, setDropdownOpen] = useState(false);
const handlelogout=async()=>{
      console.log("Logged out successfully");
  localStorage.removeItem("token");
 localStorage.removeItem("name");
  localStorage.removeItem("email");
   localStorage.removeItem("rzp_device_id");
    localStorage.removeItem("rzp_stored_checkout_id");
     localStorage.removeItem("rzp_checkout_anon_id");
      // Redirect user to login page
      window.location.href = "/login";
    }
  return (
    <>
      {/* ================= SIDEBAR ================= */}
      <motion.div
        initial={{ x: -350 }}
        animate={{ x: sidebarOpen ? 0 : -350 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-32 left-0 h-full w-[350px] bg-black shadow-lg z-[1000]"
      >
        <div className="bg-[#232f3e] p-4 text-white">
          <p className="text-sm">Browse</p>
          <h1 className="text-3xl font-bold">Amazon</h1>
        </div>

        <div className="flex justify-between">
          <div className="w-full">
            {[
              "Trending",
              "Bestsellers",
              "New Releases",
              "Mobiles",
              "Computers",
              "Books",
            ].map((item) => (
              <div key={item} className="text-white p-3 border-b">
                {item}
              </div>
            ))}
          </div>

          <div onClick={handleClick} className="cursor-pointer p-4">
            <h1 className="text-blue-500 text-3xl border p-1">X</h1>
          </div>
        </div>
      </motion.div>

      {/* ================= HEADER ================= */}
      <div className="bg-[#232f3e] fixed w-full top-0 z-[1000]">
        <div className="flex justify-between items-center px-4 py-4">

          {/* ---------- LEFT ---------- */}
          <div className="flex items-center gap-3">
            <img
              src={icon}
              className="w-8 cursor-pointer"
              alt="Menu"
              onClick={handleClick}
            />
            <NavLink to="/">
              <img src={k} className="w-32" alt="Amazon" />
            </NavLink>
          </div>

          {/* ---------- RIGHT ---------- */}
          <div className="flex items-center gap-6">

            {/* USER AVATAR / SIGN IN */}
            <div className="relative inline-block">
              <div
                title={name}
                 onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black cursor-pointer"
              >
                {firstLetter}
              </div>
  
   {dropdownOpen && (
            <div className="absolute top-full  w-20  bg-white rounded shadow-lg z-50">
              <button
                onClick={handlelogout}
                className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
          </div>
            {/* CART */}
            <NavLink to="/main/Cart">
              <div className="relative flex items-center justify-center">
                {cartCount > 0 && (
                  <span className="absolute -top-2 left-4 text-orange-400 font-bold text-sm">
                    {cartCount}
                  </span>
                )}
                <img src={Grocery} className="w-9 h-9" alt="Cart" />
              </div>
            </NavLink>

          </div>
        </div>
      </div>
    </>
  );
};
