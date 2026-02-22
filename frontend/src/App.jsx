import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import LandingPage from './pages/LandingPage'
import ForgotPassword from './pages/ForgotPassword'
import OtherPage from './pages/OtherPage'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import useGetCity from './hooks/useGetCity'
import useGetMyShop from './hooks/useGetMyShop'
import CreateEditShop from './pages/CreateEditShop'
import AddItems from './pages/AddItems'
import EditItem from './pages/EditItem'

export const serverUrl = "http://localhost:5000";

const App = () => {
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();
  const {userData, isLoading} = useSelector(state => state.user);
  
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
      <Route path='/' element={userData ? <Home /> : <Navigate to={"/signin"}/>}/>
    </Routes>

  )
}

export default App
