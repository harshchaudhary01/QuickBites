import React from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import UserOrderCard from '../components/UserOrderCard';
import OwnerOrderCard from '../components/OwnerOrderCard';
import { useEffect } from 'react';
import { addMyOrder } from '../redux/userSlice';

const MyOrders = () => {
    const { userData, myOrders, socket } = useSelector(state=>state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if (!socket || userData?.role !== "owner") {
            return;
        }

        const handleNewOrder = (data) => {
            const ownerId = data?.shopOrders?.owner?._id || data?.shopOrders?.owner;
            if (String(ownerId) === String(userData?._id)) {
                dispatch(addMyOrder(data));
            }
        };

        socket.on('newOrder', handleNewOrder)

        return()=>{
            socket.off('newOrder', handleNewOrder)
        }
    },[dispatch, socket, userData?._id, userData?.role])

    return (
        <div className='w-full min-h-screen bg-[#fff9f6] flex justify-center px-4'>
            <div className='w-full max-w-200 p-4'>
                <div className='flex items-center gap-5 mb-6'>
                    <div className='z-10 cursor-pointer' onClick={() => navigate("/")}>
                        <IoMdArrowRoundBack size={30} className='text-[#ff4d2d]' />
                    </div>
                    <h1 className='text-2xl font-bold text-start'>My Orders</h1>
                </div>
                <div className='space-y-6'>
                    {myOrders?.map((order,idx)=>(
                        userData.role=="user" ? (
                            <UserOrderCard data={order} key={idx} />
                        ):
                        userData.role == "owner" ? (
                            <OwnerOrderCard data={order} key={idx} />
                        ): null
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyOrders
