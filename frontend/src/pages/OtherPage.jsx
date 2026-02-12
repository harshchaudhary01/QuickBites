import React from 'react'

const OtherPage = () => {
  return (
    <div className="h-screen w-full bg-[#FE9D00] flex items-center justify-end">
  <video
    className="h-full rounded-lg"
    muted
    autoPlay
    loop
  >
    <source src="./vdo1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

  )
}

export default OtherPage
