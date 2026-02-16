import React from "react"
import { useSelector } from "react-redux"
import UserDashboard from "../components/UserDashboard"
import AdminDashboard from "../components/AdminDashboard"
import DeliveryBoyDashboard from "../components/DeliveryBoyDashboard";
const Home = () => {
    const {userData} = useSelector(state => state.user)
  return (
    <div className="w-screen min-h-100vh pt-25 flex flex-col items-center bg-[#fff9f6]">
      {userData.role === "user" && <UserDashboard />}
      {userData.role === "admin" && <AdminDashboard />}
      {userData.role === "deliveryBoy" && <DeliveryBoyDashboard />}
    </div>
  )
}

export default Home
