import React from 'react'

const Footer = () => {
  return (
    <div className="relative">
      <div className="w-full h-40 bg-white"></div>
      <div className="wavy w-full h-80 bg-orange-400"></div>
      <img
        src="./food-items/bg-transparent.png"
        className="absolute top-15 right-10 w-105 z-20 drop-shadow-2xl"
        alt=""
      />

    </div>
  )
}

export default Footer
