import React from 'react'

const Cards = ({img}) => {
  return (
    <div className="w-80 h-full border-2 border-dashed border-black px-5 py-5 shrink-0">
            <img
              src={img}
              alt=""
              className="w-full"
            />
            <div className='text-center'>
                <h2 className=' text-3xl font-extrabold pt-10 mt-5 mb-5'>₹75 OFF</h2>
            <p className='text-md mb-3'>Min. Order value 599</p>
            <a className='' href="#">View Details</a> <br />
            <button className='mt-5 px-6 py-2 bg-black text-white rounded-3xl'>Apply Offer</button>
            </div>
    </div>
  )
}

export default Cards;
