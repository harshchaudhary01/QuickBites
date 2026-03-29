import React, { useEffect, useRef, useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { IoStar } from "react-icons/io5";
import RestaurantCard from "./RestaurantCard";
import { PiSlidersHorizontal } from "react-icons/pi";
import Navbar from "./Navbar";
import { categories } from "../../category";
import CategoryCard from "./CategoryCard";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import {useNavigate} from "react-router-dom";
import { serverUrl } from "../App";

const UserDashboard = () => {

  const navigate = useNavigate();

  const {currentCity, shopsInMyCity, itemsInMyCity, searchItems} = useSelector(state=>state.user);

  const catScrollRef = useRef();
  const shopScrollRef = useRef();

  const [leftBtn, setLeftBtn] = useState(false)
  const [rightBtn, setRightBtn] = useState(false)

  const [leftShopBtn, setLeftShopBtn] = useState(false)
  const [rightShopBtn, setRightShopBtn] = useState(false)

  const [updatedItemsList, setUpdatedItemsList] = useState([]);

  const handleFilterByCategory = (category)=>{
    if(category == "All"){
      setUpdatedItemsList(itemsInMyCity);
    }
    else{
      const filteredList = itemsInMyCity.filter(i=>i.category === category);
      setUpdatedItemsList(filteredList);
    }
  }

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity)
  }, [itemsInMyCity])
  

  const updateButton = (ref, setLeftBtn, setRightBtn)=>{
  const element = ref.current;
  if(element){
    setLeftBtn(element.scrollLeft > 0);
    setRightBtn(element.scrollLeft + element.clientWidth < element.scrollWidth)
  }
}

const scrollHandler = (ref, direction)=>{
  if(ref.current){
    ref.current.scrollBy({
      left:direction == "left"? -200 : 200,
      behavior: "smooth"
    })
  }
}

useEffect(()=>{
  if(catScrollRef.current){
    catScrollRef.current.addEventListener('scroll',()=>{
      updateButton(catScrollRef, setLeftBtn, setRightBtn)
    })
    // Check button visibility on mount
    updateButton(catScrollRef, setLeftBtn, setRightBtn);


    shopScrollRef.current.addEventListener('scroll',()=>{
      updateButton(shopScrollRef, setLeftShopBtn, setRightShopBtn)
    })
    // Check button visibility on mount
    updateButton(shopScrollRef, setLeftShopBtn, setRightShopBtn);
  }
},[])

  return (
    <div className="min-h-screen w-screen flex flex-col gap-5 items-center overflow-y-auto bg-[#fff9f6]">
      <Navbar />  

      {searchItems && searchItems.length > 0 && 
      (<div className="w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white shadow-md rounded-2xl mt-4">
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-semibold border-b border-gray-200 pb-2">Search Result</h1>
        <div className="w-full h-auto flex flex-wrap gap-6 justify-center">
          {searchItems.map((item)=>(
            <FoodCard data={item} key={item._id} />
          ))}
        </div>
      </div>)}

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">Inspiration for your first Order.</h1>
        <div className="w-full relative">
          {leftBtn && <button onClick={()=>scrollHandler(catScrollRef,"left")} className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10">
            <FaCircleChevronLeft />
          </button>}
          <div className="w-full flex overflow-x-auto gap-4 pb-2" ref={catScrollRef}>
            {categories?.map((cat,idx)=>(<CategoryCard name={cat.category} image={cat.image} key={idx} onClick={()=>handleFilterByCategory(cat.category)} />))}
          </div>
          {rightBtn && <button onClick={()=>scrollHandler(catScrollRef,"right")} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10">
            <FaCircleChevronRight />
          </button>}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5">
         <h1 className="text-gray-800 text-2xl sm:text-3xl">Best Shops in {currentCity}</h1>
         <div className="w-full relative">
          {leftShopBtn && <button onClick={()=>scrollHandler(shopScrollRef,"left")} className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10">
            <FaCircleChevronLeft />
          </button>}
          <div className="w-full flex overflow-x-auto gap-4 pb-2" ref={shopScrollRef}>
            {shopsInMyCity?.map((shop,idx)=>(<CategoryCard name={shop.name} image={shop.image} key={idx} onClick={()=>navigate(`/shop/${shop._id}`)} />))}
          </div>
          {rightShopBtn && <button onClick={()=>scrollHandler(shopScrollRef,"right")} className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10">
            <FaCircleChevronRight />
          </button>}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-2.5">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">Suggested Food Items</h1>

        <div className="w-full h-auto flex flex-wrap gap-5 justify-center">
          {updatedItemsList?.map((item,idx)=>(
            <FoodCard key={idx} data={item} />
          ))}
        </div>

      </div>

    </div>
  );
};
export default UserDashboard;