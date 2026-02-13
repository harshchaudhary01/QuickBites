import React from 'react'
import Cards from '../components/cards'

import { useNavigate } from 'react-router-dom';
import OtherPage from './OtherPage';
import MenuSection from './MenuSection';
import Footer from './Footer';


const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen w-full'>
      {/* navbar */}
      <div className='fixed top-0 left-0 h-12 w-full bg-opacity-10 backdrop-blur-lg p-4 z-10 flex items-center justify-between px-20'>
        <div>
          <h2 className='text-3xl font-extrabold font-sans'>Quick<span className='text-orange-600'>Bites</span></h2>
        </div>

        <div className='flex items-center justify-center gap-20 font-medium bg-orange-600 px-10 py-2 rounded-2xl'>
          <p className='text-white'>Home</p>
          <p className='text-white'>Restaurants</p>
          <p className='text-white'>Contact</p>
        </div>

        <div>
          <button onClick={() => navigate("/signup")} className='bg-black text-white px-6 py-2 rounded-xl'>Sign Up</button>
        </div>
      </div>

      <OtherPage />

      <div className='w-full'>
        <MenuSection />
      </div>
      

      <div className='w-full flex items-center justify-between px-30 py-10'>
        <h1 className='text-4xl text-center'>When it comes to making your day <br /><span  className='text-red-500 font-medium'>Nothing gets in our way!</span></h1>
        <img className='border-b-2 border-gray-400' src="scooter-person.png" alt="" />
      </div>

<div className='w-full'>
        <h1 className='text-center text-3xl font-bold uppercase'>Save More as you order</h1>

        <div className="w-full px-20 py-5 mt-5 flex items-center gap-10 overflow-x-auto flex-nowrap ">
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
      
      <Footer />

    </div>
  )
}

export default LandingPage
