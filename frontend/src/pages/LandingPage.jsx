import React from 'react'
import Cards from '../components/cards'

import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className='relative h-screen w-full'>
      {/* navbar */}
      <div className='fixed top-0 left-0 h-15 rounded-b-full w-full bg-[#FF7F11] z-10 flex items-center justify-between px-20'>
        <div>
          <h2 className='text-3xl font-extrabold font-sans'>QuickBites</h2>
        </div>

        <div className='flex items-center justify-center gap-20 font-medium'>
          <p>Home</p>
          <p>Restaurants</p>
          <p>Contact</p>
        </div>

        <div>
          <button onClick={() => navigate("/signup")} className='bg-black text-white px-6 py-2 rounded-xl'>Sign Up</button>
        </div>
      </div>

      <div className='curved-edge pt-30 px-18 h-[118vh] border-0 w-full bg-cover bg-center'>
        <h1 className='text-[6vw] leading-tight font-extrabold text-black'>We Serve <br /> The Taste <br /> You Love 😋</h1>
        <p className='text-black'>Because a hungry man will always be an angry man.</p>
        <div className='flex gap-5 '>
          <button className='text-black border px-4 py-2 border-dashed border-black'>Let’s Explore</button>
          <button className='text-black border px-4 py-2 border-dashed border-black'>Order Now</button>
        </div>
      </div>
      <div className='w-full'>
        <h1 className='text-center text-3xl font-bold uppercase'>Save More as you order</h1>

        <div className="w-full px-20 py-10 mt-5 flex items-center gap-10 overflow-x-auto flex-nowrap ">
          <Cards img={"slider-images/75Off.jpg"} />
          <Cards img={"slider-images/99.jpg"} />
          <Cards img={"slider-images/burger.jpg"} />
          <Cards img={"slider-images/extra40%.jpg"} />
          <Cards img={"slider-images/extra50%.jpg"} />
          <Cards img={"slider-images/freeClassicGingerBurger.jpg"} />
          <Cards img={"slider-images/freeVegZinger.jpg"} />
          <Cards img={"slider-images/fries.jpg"} />
          <Cards img={"slider-images/kfc.jpg"} />
          <Cards img={"slider-images/roll.jpg"} />
          <Cards img={"slider-images/upto100Off.jpg"} />
          <Cards img={"slider-images/vegBurger.jpg"} />
        </div>

      </div>

      <div className='w-full flex items-center justify-between px-30 py-10'>
        <h1 className='text-4xl text-center'>When it comes to making your day <br /><span  className='text-red-500 font-medium'>Nothing gets in our way!</span></h1>
        <img className='border-b-2 border-gray-400' src="scooter-person.png" alt="" />
      </div>

      <div className='w-full h-screen bg-amber-200'>

      </div>

    </div>
  )
}

export default LandingPage
