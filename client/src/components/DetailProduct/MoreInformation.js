import React, {memo} from 'react'
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaShippingFast, FaGift, FaPhoneAlt } from "react-icons/fa";
import { BsArrowReturnLeft } from "react-icons/bs";


const information = [
    {
        id: 1,
        title: 'Guarantee',
        description: 'Quality Checked',
        icons: <IoShieldCheckmarkSharp color='white' size={20}/>
    },
    {
        id: 2,
        title: 'Free Shipping',
        description: 'Free On All Products',
        icons: <FaShippingFast color='white' size={20}/>
    },
    {
        id: 3,
        title: 'Special Gift Cards',
        description: 'Special Gift Cards',
        icons: <FaGift color='white' size={20}/>
    },
    {
        id: 4,
        title: 'Free Return',
        description: 'Within 7 Days',
        icons: <BsArrowReturnLeft color='white' size={20}/>
    },
    {
        id: 5,
        title: 'Consultancy',
        description: 'Lifetime 24/7/356',
        icons: <FaPhoneAlt color='white' size={20}/>
    }
]

const MoreInformation = () => {
  return (
    <>
    {information.map((el, index)=>(
        <div key={index} className='flex border gap-2 w-full items-center justify-start p-2'>
        <span className='bg-gray-400 rounded-full border px-2 py-2 flex items-center'>{el.icons}</span>
        <div className='flex flex-col'>
            <span>{el.title}</span>
            <span className='text-gray-400 text-xs'>{el.description}</span>
        </div>
    </div>
    ))}
    </>
  )
}

export default memo(MoreInformation)