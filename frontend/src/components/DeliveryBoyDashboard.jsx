import React, { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { serverUrl } from '../App.jsx';
import DeliveryBoyTracking from './DeliveryBoyTracking.jsx';

const DeliveryBoyDashboard = () => {
  const {userData} = useSelector(state=>state.user);
  const [availableAssignments, setAvailableAssignments] = useState(null);
  const [otp, setOtp] = useState("")
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [currentOrder, setCurrentOrder] = useState();
  const getAssignments = async ()=>{
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-assignments`,{withCredentials: true})
      setAvailableAssignments(result.data);
    } catch (error) {
      console.log(error)
    }
  }

  const getCurrentOrder = async ()=>{
    try {
      const result = await axios.get(`${serverUrl}/api/order/get-current-order`,{withCredentials: true})
      // console.log(result.data);
      setCurrentOrder(result.data);
    } catch (error) {
      console.log(error)
    }
  }

  const acceptOrder = async (assignmentId)=>{
    try {
      const result = await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`,{withCredentials: true})
      console.log(result.data);
      await getCurrentOrder();
    } catch (error) {
      console.log(error)
    }
  }

  const sendOtp = async ()=>{
    try {
      const result = await axios.post(`${serverUrl}/api/order/send-delivery-otp/`,{orderId:currentOrder._id, shopOrderId:currentOrder.shopOrder._id},{withCredentials: true})
      alert(result.data.message || 'OTP sent to customer')
      setShowOtpBox(true);
      setOtp('');
    } catch (error) {
      console.log(error)
      alert(error?.response?.data?.message || 'Failed to send OTP')
    }
  }

  const verifyOtp = async ()=>{
    if (!otp || otp.trim().length === 0) {
      alert('Enter the OTP before submitting')
      return
    }

    try {
      const result = await axios.post(`${serverUrl}/api/order/verify-delivery-otp/`,{orderId:currentOrder._id, shopOrderId:currentOrder.shopOrder._id, otp: otp.trim()},{withCredentials: true})
      alert(result.data.message || 'OTP verified, order marked delivered')
      setShowOtpBox(false)
      setOtp('')
      await getCurrentOrder()
      await getAssignments()
    } catch (error) {
      console.log(error)
      alert(error?.response?.data?.message || 'Invalid or expired OTP')
    }
  }

  useEffect(() => {
    getAssignments();
    getCurrentOrder();
  }, [userData])
  
  return (
    <div className='min-h-screen w-screen flex flex-col gap-5 items-center overflow-y-auto bg-[#fff9f6]'>
      <Navbar />
      <div className='w-full max-w-200 flex flex-col gap-5 items-center'>
        <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] border border-orange-100 text-center gap-2'>
          <h1 className='text-xl font-bold text-[#ff4d2d]'>Welcome, {userData.fullName}</h1>
          <p className='text-[#ff4d2d] font-medium'><span className='font-bold text-black'>Latitude: </span>{userData.location.coordinates[1]}, <span className='font-bold text-black'>Longitude: </span>{userData.location.coordinates[0]}</p>
        </div>

        {!currentOrder && <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
          <h1 className='text-lg font-bold mb-4 flex items-center gap-2'>Available Orders</h1>
          <div className='space-y-4'>
            {availableAssignments && availableAssignments.length > 0 ? 
            (
              availableAssignments.map((a,index)=>(
                <div className='border rounded-lg p-4 flex justify-between items-center' key={index}>
                  <div>
                    <p className='text-sm font-semibold'>{a.shopName}</p>
                    <p className='text-sm text-gray-500'><span className='font-semibold'>Delivery Address: </span>{a?.deliveryAddress.text}</p>
                    <p className='text-xs text-gray-400'>{a.items.length} items | ₹{a.subTotal}</p>
                  </div>
                  <button onClick={()=>acceptOrder(a.assignmentId)} className='bg-orange-500 text-white py-1 px-4 rounded-lg text-sm hover:bg-orange-600'>Accept</button>
                </div>
              ))
            ): <p className='text-gray-400 text-sm'>No Available Orders</p>
          }
          </div>
        </div>}

        {currentOrder && 
          <div className='bg-white rounded-2xl p-5 shadow-md w-[90%] border border-orange-100'>
            <h2 className='text-lg font-bold mb-3'>📦Current Order</h2>
            <div className='border rounded-lg p-4 mb-3'>
              <p className='font-semibold text-sm'>{currentOrder?.shopOrder.shop.name}</p>
            <p className='text-sm text-gray-500'>{currentOrder.deliveryAddress.text}</p>
            <p className='text-xs text-gray-400'>{currentOrder.shopOrder.shopOrderItems.length} orders | ₹{currentOrder.shopOrder.subTotal}</p>
            </div>

            <DeliveryBoyTracking data={currentOrder} />
            {!showOtpBox ? <button onClick={sendOtp} className='mt-4 w-full bg-green-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-green-600 active:scale-95 transition-all duration-200'>Mark as Delivered</button>:
            <div className='mt-4 p-4 rounded-xl bg-gray-50'>
              <p className='text-sm font-semibold mb-2'>Enter OTP send to <span className='text-orange-500'>{currentOrder.user.fullName}</span></p>
              <input onChange={(e)=>setOtp(e.target.value)} value={otp} placeholder='Enter OTP' type="text" className='w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400 ' />
              <button onClick={verifyOtp} className='mt-4 w-full bg-orange-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-orange-600 active:scale-95 transition-all duration-200'>Submit OTP</button>
            </div>}
          </div>
        }
      </div>
    </div>
  )
}

export default DeliveryBoyDashboard
