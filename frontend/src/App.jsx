import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import LandingPage from './pages/LandingPage'
import ForgotPassword from './pages/ForgotPassword'
import OtherPage from './pages/OtherPage'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import useGetCity from './hooks/useGetCity'
import useGetMyShop from './hooks/useGetMyShop'
import CreateEditShop from './pages/CreateEditShop'
import AddItems from './pages/AddItems'
import EditItem from './pages/EditItem'
import useGetShopByCity from './hooks/useGetShopByCity'
import useGetItemsByCity from './hooks/useGetItemsByCity'
import CartPage from './pages/CartPage'
import CheckOut from './pages/CheckOut'
import OrderPlaced from './pages/OrderPlaced'
import MyOrders from './pages/MyOrders'
import useGetMyOrders from './hooks/useGetMyOrders'
import useUpdateLocation from './hooks/useUpdateLocation'
import TrackOrderPage from './pages/TrackOrderPage'
import Shop from './components/Shop'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { setSocket } from './redux/userSlice'

// export const serverUrl = "http://localhost:5000";
// export const serverUrl = "https://quickbites-backend-co85.onrender.com";
// export const serverUrl = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://quickbites-backend-co85.onrender.com';

export const serverUrl =
  window.location.hostname === 'localhost'
    ? 'http://localhost:5000'   // local dev
    : 'http://backend:5000';    // Docker container

const App = () => {
  useGetCurrentUser();
  useUpdateLocation();
  useGetCity();
  useGetMyShop();
  useGetShopByCity();
  useGetItemsByCity();
  useGetMyOrders();
  const {userData, isLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    const socketInstance = io(serverUrl,{withCredentials: true});
    dispatch(setSocket(socketInstance))
    socketInstance.on('connect',()=>{
      if(userData){
        socketInstance.emit('identity',{userId: userData._id});
      }
    })
    return ()=>{
      socketInstance.disconnect();
    }
  },[userData?._id])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    // <Routes>
    //   <Route path="/" element={!userData ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
    //   <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/dashboard" replace />} />
    //   <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to="/dashboard" replace />} />
    //   <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to="/dashboard" replace />} />
    //   <Route path='/dashboard' element={userData ? <Home /> : <Navigate to="/" replace />} />
    // </Routes>

    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"}/>}/>
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to={"/"}/>}/>
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"}/>}/>
      <Route path='/create-edit-shop' element={userData ? <CreateEditShop /> : <Navigate to={"/signin"}/>}/>
      <Route path='/add-item' element={userData ? <AddItems /> : <Navigate to={"/signin"}/>}/>
      <Route path='/edit-item/:itemId' element={userData ? <EditItem /> : <Navigate to={"/signin"}/>}/>
      <Route path='/cart' element={userData ? <CartPage /> : <Navigate to={"/signin"}/>}/>
      <Route path='/checkout' element={userData ? <CheckOut /> : <Navigate to={"/signin"}/>}/>
      <Route path='/order-placed' element={userData ? <OrderPlaced /> : <Navigate to={"/signin"}/>}/>
      <Route path='/my-orders' element={userData ? <MyOrders /> : <Navigate to={"/signin"}/>}/>
      <Route path='/track-order/:orderId' element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"}/>}/>
      <Route path='/shop/:shopId' element={userData ? <Shop /> : <Navigate to={"/signin"}/>}/>
      <Route path='/' element={userData ? <Home /> : <Navigate to={"/signin"}/>}/>
    </Routes>

  )
}

export default App
