import React from "react"
import { useSelector } from "react-redux"
import UserDashboard from "../components/UserDashboard"
import DeliveryBoyDashboard from "../components/DeliveryBoyDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
const Home = () => {
    const {userData} = useSelector(state => state.user)
  return (
    <div className="w-full min-h-100vh pt-25 flex flex-col items-center bg-[#fff9f6]">
      {userData.role === "user" && <UserDashboard />}
      {userData.role === "owner" && <OwnerDashboard /> }
      {userData.role === "deliveryBoy" && <DeliveryBoyDashboard />}
    </div>
  )
}
export default Home