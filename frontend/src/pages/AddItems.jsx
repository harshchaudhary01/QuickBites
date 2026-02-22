import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom"
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';
const AddItems = () => {
  const navigate = useNavigate();

  const { myShopData } = useSelector(state => state.owner);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const [category, setCategory] = useState("");
  const categories = ["Snacks","Main Course","Desserts","Pizza","Burgers","Sandwiches","South Indian","North Indian","Chinese","Fast Food","Others"];
  const [foodType, setFoodType] = useState("veg");

  const[loading, setLoading] = useState(false);

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
      formData.append("category",category);
      formData.append("foodType",foodType);
      formData.append("price",price);
      if(backendImage){
        formData.append("image",backendImage);
      }
      const result = await axios.post(`${serverUrl}/api/item/add-item`,formData, {withCredentials: true});
      dispatch(setMyShopData(result.data))
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
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
            Add Food
          </div>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} placeholder='Enter food name' type="text" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Add Food Image</label>
            <input onChange={handleImage} accept='image/*' type="file" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
            {frontendImage && <div className='mt-4'>
              <img className='w-full h-48 object-cover rounded-lg border' src={frontendImage} alt="" />
            </div>}
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
            <input onChange={(e)=>setPrice(e.target.value)} value={price} placeholder='0' type="number" className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Select Category</label>
            <select onChange={(e)=>setCategory(e.target.value)} value={category}  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'>
                <option value="">Select Category</option>
                {categories.map((cat,idx)=>(<option value={cat} key={idx}>{cat}</option>))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Select Food Type</label>
            <select onChange={(e)=>setFoodType(e.target.value)} value={foodType} className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'>
                <option value="veg">veg</option>
                <option value="non veg">non veg</option>
            </select>
          </div>
          <button className='w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow:md hover:bg-orange-600 hover:shadow-lg transition-all duration-200' disabled={loading}>
              {loading ? <ClipLoader size={20} color='white' /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  )
}
export default AddItems;
