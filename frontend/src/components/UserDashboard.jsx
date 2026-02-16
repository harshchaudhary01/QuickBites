import React from "react";
import { TiShoppingCart } from "react-icons/ti";
import { IoStar } from "react-icons/io5";
import RestaurantCard from "./RestaurantCard";

import { PiSlidersHorizontal } from "react-icons/pi";

const UserDashboard = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/70 border-b-2 border-orange-400 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          
          <h2 className="text-2xl font-extrabold">
            Quick<span className="text-orange-600">Bites</span>
          </h2>

          <div className="flex items-center border border-orange-600 px-3 py-2 rounded-2xl w-1/3 bg-white">
            <input
              className="outline-none w-full text-sm"
              placeholder="Search..."
              type="text"
            />
          </div>

          <button
            className="p-2 rounded-xl hover:bg-orange-100 transition"
          >
            <TiShoppingCart size={26} className="text-red-500" />
          </button>
        </div>
      </div>

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