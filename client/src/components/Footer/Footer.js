import React, { memo } from 'react'
import { MdOutlineMarkEmailRead } from "react-icons/md"
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareGooglePlus, FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='w-full flex flex-col'>
        <div className='h-[103px] w-full bg-main flex items-center justify-center'>
            <div className='w-main flex justify-between items-center'>
                <div className='flex flex-col text-white flex-1'>
                    <span className='text-[20px] text-gray-100'>SIGN UP TO NEWSLETTER</span>
                    <small className='text-[13px] text-gray-300'>Subcribe now and receive weekly newsletter</small>
                </div>
                    <div className='flex-1 flex items-center'>
                        <input 
                        type='text' 
                        className='p-4 pr-0 rounded-l-full w-full bg-[#F04646] outline-none text-gray-100
                        placeholder:text-gray-200 placeholder:text-sm placeholder:italic placeholder:opacity-50'
                        placeholder='Email adress...'
                        />
                    <div className='h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center cursor-pointer text-white'>
                        <MdOutlineMarkEmailRead size={25}/>
                    </div>
                </div>
            </div>
        </div>
        <div className='h-[407px] w-full bg-gray-900 flex items-center justify-center'>
            <div className='w-main flex'>   
                <div className='w-2/5 text-white flex flex-col gap-2'>
                    <h3 className='mb-[20px] text-[15px] font-medium border-l-4 border-main pl-[15px]'>ABOUT US</h3>
                    <div>
                        <span>Address:</span>
                        <span className='opacity-70'> 474 Ontario St Toronto, ON M4X 1M7 Canada</span>
                    </div>
                    <div>
                        <span>Phone:</span>
                        <span className='opacity-70'> (+1234)56789xxx</span>
                    </div>
                    <div>
                        <span>Mail:</span>
                        <span className='opacity-70'> tadathemes@gmail.com</span>
                    </div>
                    <div className='flex gap-2'>
                        <span className='cursor-pointer'><FaFacebookSquare size={30}/></span>
                        <span className='cursor-pointer'><FaSquareGooglePlus size={30}/></span>
                        <span className='cursor-pointer'><FaSquareXTwitter size={30}/></span>
                        <span className='cursor-pointer'><FaLinkedin size={30}/></span>
                    </div>
                </div>
                <div className='w-1/5 text-white'>
                    <h3 className='mb-[20px] text-[15px] font-medium border-l-4 border-main pl-[15px]'>INFORMATION</h3>
                    <div className='flex flex-col gap-2 opacity-70'>
                        <span className='cursor-pointer hover:text-main'>Typography</span>
                        <span className='cursor-pointer hover:text-main'>Gallery</span>
                        <span className='cursor-pointer hover:text-main'>Store Location</span>
                        <span className='cursor-pointer hover:text-main'>Today's Deals</span>
                        <span className='cursor-pointer hover:text-main'>Contact</span>
                    </div>
                </div>
                <div className='w-1/5 text-white'>
                    <h3 className='mb-[20px] text-[15px] font-medium border-l-4 border-main pl-[15px]'>WHO WE ARE</h3>
                    <div className='flex flex-col gap-2 opacity-70'>
                        <span className='cursor-pointer hover:text-main'>Help</span>
                        <span className='cursor-pointer hover:text-main'>Free Shipping</span>
                        <span className='cursor-pointer hover:text-main'>FAQs</span>
                        <span className='cursor-pointer hover:text-main'>Return & Exchange</span>
                        <span className='cursor-pointer hover:text-main'>Testimonials</span>
                    </div>
                </div>
                <div className='w-1/5 text-white'>
                    <h3 className='mb-[20px] text-[15px] font-medium border-l-4 border-main pl-[15px]'>#DIGITALWORLDSTORE</h3>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default memo(Footer)