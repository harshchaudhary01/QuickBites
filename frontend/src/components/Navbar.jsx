import React, { useState } from 'react'
import { TiShoppingCart } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { setUserData } from '../redux/userSlice';
import axios from 'axios';
import { serverUrl } from '../App';
import { FiPlus } from "react-icons/fi";
import { TbReceiptRupee } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const { userData, currentCity, cartItems } = useSelector(state => state.user);
    const { myShopData } = useSelector(state => state.owner);

    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const dispatch = useDispatch();
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`,{ withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }
        return (
            <div className="fixed top-0 w-full h-20 flex items-center justify-between md:justify-center gap-7.5 px-5 py-4 backdrop-blur-lg bg-[#fff9f6] overflow-visible z-50">

                {showSearch && userData.role == "user" && (
                    <div className="w-[90%] h-17.5 gap-5 flex fixed top-20 left-[5%] bg-white shadow-xl rounded-lg items-center md:hidden">

                        {/* Location Section */}
                        <div className="flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400 ">
                            <FaLocationDot size={25} className="text-gray-600" />
                            <div className="w-[80%] truncate">
                                {currentCity}
                            </div>
                        </div>

                        {/* Search Section */}
                        <div className="w-[70%] flex items-center gap-2.5 px-2.5">
                            <IoIosSearch size={25} className="text-[#ff4d2d]" />
                            <input
                                type="text"
                                placeholder="search delicious food ..."
                                className="px-2.5 text-gray-700 outline-none w-full"
                            />
                        </div>
                    </div>
                )}


                <h2 className="text-3xl mb-2 font-extrabold">
                    Quick<span className="text-[#ff4d2d]">Bites</span>
                </h2>

                {userData.role === "user" && <div className='md:w-[60%] lg:w-[40%] h-17.5 bg-white shadow-xl rounded-lg items-center gap-5 hidden md:flex'>
                    <div className='flex items-center w-[30%] overflow-hidden gap-2.5 px-2.5 border-r-2 border-gray-400'>
                        <FaLocationDot size={25} className='text-[#ff4d2d]' />
                        <div className='w-[80%] truncate text-gray-600'>{currentCity}</div>
                    </div>
                    <div className='w-[80%] flex items-center gap-2.5'>
                        <IoIosSearch size={25} className='text-[#ff4d2d]' />
                        <input type="text" placeholder='Search delicious foods...' className='w-full px-2.5 text-gray-700 outline-0' />
                    </div>
                </div>}

                <div className='flex items-center gap-6'>
                    {userData.role == "user" && ((showSearch) ? <RxCross1 size={25} className='text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(false)} /> : <IoIosSearch size={25} className='text-[#ff4d2d] md:hidden' onClick={() => setShowSearch(true)} />)}

                    {/* Add Food Items -> Owner */}
                    {userData.role == "owner" ? <>
                        {myShopData && <>
                            <button onClick={()=>navigate("/add-item")} className='hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]'>
                            <FiPlus size={20} />
                            <span>Add Food Items</span>
                        </button>
                        <button onClick={()=>navigate("/add-item")} className='md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]'>
                            <FiPlus size={20} />
                        </button>
                        </>}

                        <div onClick={()=>navigate("/my-orders")} className='hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
                            <TbReceiptRupee size={20} />
                            <span>My Orders</span>
                            <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff2d4d] rounded-full px-1.5 py-px'>0</span>
                        </div>
                        <div onClick={()=>navigate("/my-orders")} className='md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium'>
                            <TbReceiptRupee size={20} />
                            <span className='absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff2d4d] rounded-full px-1.5 py-px'>0</span>
                        </div>
                    </> : <>
                        {/* Cart */}
                    {userData.role == "user" && <button onClick={()=>navigate("/cart")} className="relative cursor-pointer">
                        <TiShoppingCart size={30} md:size={25} className='text-[#ff4d2d]' />
                        <span className='absolute -right-2.25 -top-3 text-[#ff4d2d] text-lg'>{cartItems.length}</span>
                    </button>}

                    {/* My Order */}
                    <button onClick={()=>navigate("/my-orders")} className='hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-sm font-medium text-[#ff4d2d]'>
                        My Order
                    </button>
                    </>}

                    

                    {/* Profile */}
                    <button onClick={() => { setShowInfo(prev => !prev) }} className='w-10 h-10 rounded-full flex items-center justify-center text-white text-[18px] shadow-xl font-semibold cursor-pointer bg-[#ff4d2d]'>
                        {/* {console.log(userData?.fullName)} */}
                        {userData?.fullName ? userData.fullName.slice(0, 1) : 'G'}
                    </button>

                    {showInfo && <div className={`fixed top-20 right-2.5 ${userData.role == "deliveryBoy" ? "md:right-[20%] lg:right-[35%]" : "md:right-[10%] lg:right-[25%]"} w-45 shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-9999 bg-white`}>
                        <div className='text-sm text-orange-600 font-bold '>{userData?.fullName ? userData?.fullName : "Guest"}</div>
                        {userData?.role === "user" && <div onClick={()=>navigate("/my-orders")} className='md:hidden hover:border-b-2 w-fit border-orange-500  text-sm font-semibold '>My Orders</div>}
                        <div onClick={handleLogOut} className='text-sm cursor-pointer hover:border-b-2 w-fit border-orange-500  font-semibold '>Log Out</div>
                    </div>}
                </div>

            </div>
        )
    }

    export default Navbar
