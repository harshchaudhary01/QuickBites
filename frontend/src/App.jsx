import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import LandingPage from './pages/LandingPage'
import ForgotPassword from './pages/ForgotPassword'
import OtherPage from './pages/OtherPage'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import UserDashboard from './components/UserDashboard'
import { useSelector } from 'react-redux'

export const serverUrl = "http://localhost:5000";

const App = () => {
  useGetCurrentUser();
  const {userData, isLoading} = useSelector(state => state.user);
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <Routes>
      <Route path="/" element={!userData ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to="/dashboard" replace />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to="/dashboard" replace />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to="/dashboard" replace />} />
      <Route path='/dashboard' element={userData ? <UserDashboard /> : <Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
