import React, { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { serverUrl } from '../App.jsx';

const DeliveryBoyDashboard = () => {
  const {userData} = useSelector(state=>state.user);
  const [availableAssignments, setAvailableAssignments] = useState(null);
  const getAssignments = async ()=>{
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`,{withCredentials: true})
      setAvailableAssignments(result.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAssignments();
  }, [userData])
  
  return (
    <div className='min-h-screen w-screen flex flex-col gap-5 items-center overflow-y-auto bg-[#fff9f6]'>
      <Navbar />
      <div className='w-full max-w-200 flex flex-col gap-5 items-center'>
        <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-2'>
          <h1 className='text-xl font-bold text-[#ff4d2d]'>Welcome, {userData.fullName}</h1>
          <p className='text-[#ff4d2d] font-medium'><span className='font-bold text-black'>Latitude: </span>{userData.location.coordinates[1]}, <span className='font-bold text-black'>Longitude: </span>{userData.location.coordinates[0]}</p>
        </div>

        <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
          <h1 className='text-lg font-bold mb-4 flex items-center gap-2'>Available Orders</h1>
          <div className='space-y-4'>
            {availableAssignments && availableAssignments.length > 0 ? 
            (
              availableAssignments.map((a,index)=>(
                <div className='border rounded-lg p-4 flex justify-between items-center' key={index}>
                  <div>
                    <p>{a.shopName}</p>
                    <p>{a?.deliveryAddress.text}</p>
                    <p>{a.items.length} items | ₹{a.subTotal}</p>
                  </div>
                </div>
              ))
            ): <p className='text-gray-400 text-sm'>No Available Orders</p>
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryBoyDashboard
