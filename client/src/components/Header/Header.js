import React, { useEffect, useState } from 'react'
import { MdPhoneCallback } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BsBagCheckFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";
import { showCart } from '../../store/app/appSlice';

const Header = () => {

  const { current, isLoggedIn } = useSelector(state => state.user)
  const [isShow, setIsShow] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleClickOutside = (event) => {
    const profile = document.getElementById('profile')
    if (!profile.contains(event.target)) {
      // Bấm bên ngoài phần tử Profile, đóng isShow
      setIsShow(false);
    }
  };

  useEffect(()=>{
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[])
  
  return (
    <div className='flex justify-between w-main h-[110px] py-[35px]'>
       <Link to={`/${path.HOME}`}>
       <div className='cursor-pointer w-[234px]'>
          <span>Shop</span>
          <span className='text-main font-semibold'> ThanhTuan</span>
        </div>
       </Link>
       <div className='flex text-[13px]'>
          <div className='flex flex-col items-center border-r-2 px-6'>
            <span className='flex items-content gap-4'>
              <MdPhoneCallback color='red' size={15}/>
              <span className='font-semibold'>(+1800) 000 8808</span>
            </span>
            <span>Mon-Sat 9:00AM - 8:00PM</span>
          </div>
          <div className='flex flex-col px-6 items-center border-r-2'>
            <span className='flex items-content gap-4'>
              <IoIosMail color='red' size={15}/>
              <span className='font-semibold'>SUPPORT@GMAIL.COM</span>
            </span>
            <span>Online Support 24/7</span>
          </div>
          <div onClick={() => {isLoggedIn === true ? navigate(`${path.MEMBER}/${path.DETAIL_CART}`) : navigate(`${path.LOGIN}`)}} className='flex border-r-2 px-6 gap-2 items-center justify-center cursor-pointer'>
            <span><BsBagCheckFill color='red' /></span>
            <span>{`${current?.cart.length || 0} item(s)`}</span>
          </div>
          <div 
          id='profile'
          onClick={() => {isLoggedIn === true ? setIsShow(prev => !prev) : navigate(`${path.LOGIN}`)}} 
          className='flex items-center justify-center px-6 gap-2 cursor-pointer relative'
          >
            <button className='flex items-center justify-center gap-2'><FaUserCircle color='red' size={24}/> Profile</button>
            {isShow && current &&
            <div onClick={(e)=> e.stopPropagation()} className='absolute top-full left-[16px] border min-w-[100px] p-2 flex flex-col bg-sky-100'>
              <Link to={`/${path.MEMBER}/${path.PERSONAL}`} className='p-2 w-full hover:bg-gray-500 rounded-xl flex justify-between items-center gap-2'>Personal <IoIosArrowForward /></Link>
              { +current?.role === 9999 && 
                <Link to={`/${path.ADMIN}/${path.DASHBOARD}`} className='p-2 w-full hover:bg-gray-500 rounded-xl flex justify-between items-center gap-2'>Admin <IoIosArrowForward /></Link>
              } 
            </div>}
          </div>
       </div>
    </div>
  )
}

export default Header