import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';
const CreateEditShop = () => {
  const navigate = useNavigate();
  
  const { myShopData } = useSelector(state => state.owner);
  const dispatch = useDispatch();

  const { currentCity, currentState, currentAddress } = useSelector(state => state.user);

  const [name, setName] = useState(myShopData?.name || "");
  const [state, setState] = useState(myShopData?.state || currentState);
  const [city, setCity] = useState(myShopData?.city || currentCity);
  const [address, setAddress] = useState(myShopData?.address || currentAddress);

  const [frontendImage, setFrontendImage] = useState(myShopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleImage = (e)=>{
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file)); // URL is a object in js, with the help of this, we can make the url of the image and use it where we want to use.
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(); // FormData is a class in js, we can just pass the whole form data at once..
      formData.append("name",name); // "the name of the file, we want to see their", and the file name
      formData.append("city",city);
      formData.append("state",state);
      formData.append("address",address);
      if(backendImage){
        formData.append("image",backendImage);
      }
      const result = await axios.post(`${serverUrl}/api/shop/create-edit`,formData, {withCredentials: true});
      dispatch(setMyShopData(result.data))
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
  return (
    <div className='flex items-center justify-center flex-col p-6 bg-linear-to-br from-orange-50 relative to-white min-h-screen'>
      <div className='absolute top-5 left-5 z-10 mb-2.5 cursor-pointer' onClick={() => navigate("/")}>
        <IoMdArrowRoundBack size={30} className='text-[#ff4d2d]' />
      </div>
      <div className='max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100'>
        <div className='flex flex-col items-center mb-6'>
          <div className='bg-orange-100 p-4 rounded-full mb-4'>
            <FaUtensils className='text-[#ff4d2d] w-16 h-16' />
          </div>
          <div className='text-3xl font-extrabold text-gray-900'>
            {myShopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} placeholder='Enter shop name' type="text" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Add Shop Image</label>
            <input onChange={handleImage} accept='image/*' type="file" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
            {frontendImage && <div className='mt-4'>
              <img className='w-full h-48 object-cover rounded-lg border' src={frontendImage} alt="" />
            </div>}
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>City</label>
              <input onChange={(e)=>setCity(e.target.value)} value={city} placeholder='City' type="text" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
            </div> 
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>State</label>
              <input onChange={(e)=>setState(e.target.value)} value={state} placeholder='State' type="text" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
            </div> 
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
            <input onChange={(e)=>setAddress(e.target.value)} value={address} placeholder='Enter shop Address' type="text" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
          </div>
          <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow:md hover:bg-orange-600 hover:shadow-lg transition-all duration-200' disabled={loading}>
              {loading ? <ClipLoader size={20} color='white' /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  )
}
export default CreateEditShop
