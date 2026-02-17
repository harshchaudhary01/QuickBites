import React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { IoStar } from "react-icons/io5";
import RestaurantCard from "./RestaurantCard";

import { PiSlidersHorizontal } from "react-icons/pi";

import Navbar from "./Navbar";
const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-[#fff9f6]">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-24 px-6">
        <h2 className="text-3xl" >Restaurants in Phagwara</h2>
      </div>

      <div className="max-w-6xl pt-3 mx-auto px-6 flex items-center gap-3">
        <button className="flex items-center gap-1 text-gray-600 px-2 py-1 border-2 rounded-xl border-gray-400">
          <PiSlidersHorizontal size={15} />
          <p className="text-md font-light">Filters</p>
        </button>

        <button className="flex items-center gap-1 text-gray-600 px-3 py-1 border-2 rounded-xl border-gray-400">
          <p className="text-md font-light">Offer</p>
        </button>

        <button className="flex items-center gap-1 text-gray-600 px-3 py-1 border-2 rounded-xl border-gray-400">
          <p className="text-md font-light">Rating: 4.5+</p>
        </button>
      </div>

      <div className="max-w-6xl mx-auto pt-14 px-6">
        
        {/* Restaurants Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

          {/* Example Bento Cards */}
          <RestaurantCard />
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;