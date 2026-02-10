import React from 'react'

const LandingPage = () => {
  return (
    <div className='relative h-screen w-full'>
      {/* navbar */}
      <div className='fixed top-0 left-0 h-15 rounded-b-4xl rounded-t-lg w-full bg-[#d88b2c] z-10 flex items-center justify-between px-20'>
        <div>
          <h2 className='text-3xl font-extrabold font-sans'>QuickBites</h2>
        </div>

        <div className='flex items-center justify-center gap-20 font-medium'>
          <p>Home</p>
          <p>Restaurants</p>
          <p>Contact</p>
        </div>

        <div>
          <button className='bg-black text-white px-6 py-2 rounded-xl'>Sign Up</button>
        </div>
      </div>

      <div className='curved-edge pt-30 px-18 h-[118vh] border-0 w-full bg-[url(./public/background.png)] bg-cover bg-center'>
        <h1 className='text-[6vw] leading-tight font-extrabold text-white'>We Serve The Test <br /> You Love 😋</h1>
      </div>
      <div className='mt-20 h-screen w-full flex items-center justify-center'>
        
      </div>

    </div>
  )
}

export default LandingPage
