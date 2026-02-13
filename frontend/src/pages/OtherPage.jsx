import React, { useEffect, useState } from 'react'

const OtherPage = () => {

  const ImageSequence = [
    "./food-items/biryani.jpg",
    "./food-items/pizza2.jpg",
    "./food-items/fries2.jpg",
    "./food-items/momos.jpg",
    "./food-items/noodles.jpg",
    "./food-items/panipuri.jpg",
    "./food-items/poori.jpg",
    "./food-items/burger.jpg",
    "./food-items/pizza.jpg",
    "./food-items/subway.jpg",
    "./food-items/cake.jpg"
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % ImageSequence.length);
        setFade(true);
      }, 200); 

    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full h-screen mt-12 bg-white flex items-start pt-20 justify-between px-20'>

      <div>
        <h1 className='leading-20 text-7xl font-extrabold'>Hungry? Let's Deliver <br /> Happiness to your <br /><span className='text-orange-600'>Doorstep!</span></h1>
        <p className='mt-5 text-xl pl-1 text-gray-600 w-150 '>Skip the "what’s for dinner" debate and let us bring the good stuff. We promise to knock quietly so your dog doesn't lose its mind.</p>
        <div className='mt-20 flex items-center gap-8'>
          <button className='text-xl px-6 py-2 transition duration-150 ease-in-out transform active:scale-[0.95] rounded-xl border border-black font-medium bg-white text-orange-600'>Let's Explore</button>
        <button className='text-xl px-6 py-2 rounded-xl border-b transition duration-150 ease-in-out transform active:scale-[0.95] border-orange-900 shadow-2xl text-white bg-orange-600'>Order Now</button>
        </div>
      </div>

      <div className='relative w-140 h-140 overflow-hidden rounded-3xl'>
        <img
          key={currentImageIndex}
          src={ImageSequence[currentImageIndex]}
          alt="Food"
          className={`absolute w-full h-full object-cover transition-all duration-700 ease-in-out
            ${fade
              ? "opacity-100 scale-100 rotate-0 blur-0"
              : "opacity-0 scale-125 rotate-3 blur-md"
            }`}
        />
      </div>

    </div>
  )
}

export default OtherPage
