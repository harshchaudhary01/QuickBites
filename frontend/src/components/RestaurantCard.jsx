import React from 'react'
import { IoStar } from "react-icons/io5";
const RestaurantCard = () => {
    return (
        <div className="rounded-2xl hover:shadow-md overflow-hidden h-82 flex flex-col">
            <div>
                <img className="rounded-2xl h-60 w-full" src="https://b.zmtcdn.com/data/pictures/9/19082299/2fa9c9d5a406ea66837eef2a71493168_o2_featured_v2.jpg" alt="" />
            </div>
            <div className="mt-2 px-2">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium tracking-wide">ASF - American Style Fried</h2>
                    <p className="flex items-center gap-1 text-white bg-emerald-700 text-sm px-1 rounded-md">4.3 <IoStar /></p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="font-light tracking-wide">Roast Chicken, Chinese</p>
                    <p className="flex items-center gap-1 font-normal text-sm px-1 rounded-md">₹150 for one</p>
                </div>

                <div className="flex items-center justify-end">
                    <p className="flex items-center gap-1 font-medium text-sm px-1 rounded-md">23 min</p>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard;
