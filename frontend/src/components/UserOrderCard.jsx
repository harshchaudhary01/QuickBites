import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserOrderCard = ({data}) => {
    const navigate = useNavigate();
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB',{
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }
  return (
    <div className='bg-white rounded-lg shadow p-4 space-y-4'>
      <div className='flex justify-between border-b pb-2'>
        <div>
            <p className='font-semibold'>Order #{data._id.slice(-6)}</p>
            <p className='text-sm text-gray-500'>
                Date: {formatDate(data.createdAt)}
            </p>
        </div>
        <div className='text-right'>
            {data.paymentMethod == "cod" ? <p className='text-sm text-gray-500'>{data.paymentMethod?.toUpperCase()}</p> : <p className='text-sm text-gray-500 font-semibold'>{data.payment ? "True": "False"}</p>}
            
            <p className='font-medium text-blue-600'>{data.shopOrders?.[0].status}</p>
        </div>
      </div>
        {data.shopOrders.map((shopOrder, idx)=>(
            <div className='border rounde-lg p-3 bg-[#fffaf7] space-y-3' key={idx}>
                <p>{shopOrder.shop.name}</p>

                <div className='flex space-x-4 overflow-x-auto pb-2'>
                    {shopOrder.shopOrderItems.map((item,index)=>(
                        <div key={index} className='shrink-0 w-40 border rounded-lg p-2 bg-white'>
                            <img src={item.item?.image} className='w-full h-24 object-cover rounded' alt="" />
                            <p className='text-sm font-semibold mt-1'>{item.name}</p>
                            <p className='text-xs text-gray-500'>Qty: {item.quantity} x ₹{item.price}</p>
                        </div>
                    ))}
                </div>
                <div className='flex justify-between items-center border-t pt-2'>
                    <p className='font-semibold'>Subtotal: ₹{shopOrder.subTotal}</p>
                    <span className='text-sm text-purple-600 font-medium'>{shopOrder.status}</span>
                </div>
            </div>
        ))}

        <div className='flex justify-between items-center pt-2 border-t'>
            <p className='font-semibold'>Total: ₹{data.totalAmount}</p>
            <button onClick={()=>navigate(`/track-order/${data._id}`)} className='bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-2 rounded-lg text-sm'>Track Order</button>
        </div>
    </div>
  )
}

export default UserOrderCard
