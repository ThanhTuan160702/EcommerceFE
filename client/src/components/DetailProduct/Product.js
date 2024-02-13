import React, { useState } from 'react'
import { formatPrice } from '../../utils/helper'
import Image from '../../assets/newProduct-removebg-preview.png'
import Image1 from '../../assets/bestseller-removebg-preview.png'
import { renderStar } from '../../utils/helper'
import {SelectOption} from '../index'
import { FaHeart} from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { apiUpdateCart } from '../../apis'
import { toast } from 'react-toastify'
import { getUser } from '../../store/user/asyncAction'
import Swal from 'sweetalert2'
import path from '../../utils/path'

const Product = ({productData, activedTab, isImage}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { current } = useSelector(state => state.user)
  const onClick = async() => {
    
  }

  const [isShow, setIsShow] = useState(false)

  return (
    <div className='w-full text-base px-[10px] cursor-pointer'>
      <div className='w-full p-[15px] flex flex-col items-center'
      onClick={() => navigate(`/${productData?.category?.toLowerCase()}/${productData?._id}/${productData?.title}`)}
      >
        <div
        onMouseEnter={() => {
          setIsShow(true)
        }}
        onMouseLeave={() => {
          setIsShow(false)
        }}
        >
          <div className='w-full relative flex flex-col items-center'>
            {isShow && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
              <span title='Add to Wishlist' onClick={(e) => { e.stopPropagation(); onClick('Add to Wishlist'); }}><SelectOption icons={<FaHeart/>}/></span>
            </div>}
            <img src={productData.images[0]} alt='images' className='w-[274px] h-[274px] object-contain'/>
            {!isImage && <img src={activedTab === 1 ? Image1 : Image} alt='images' className={`${activedTab === 1 ? "w-[80px]" : "w-[120px]"} absolute top-[-25px] right-[-15px]`}/>}
          </div>
          <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
            <span className='flex'>{renderStar(productData?.totalRatings)}</span>
            <span className='line-clamp-1'>{productData.title}</span>
            <span>{`${formatPrice(productData.price)} VND`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product