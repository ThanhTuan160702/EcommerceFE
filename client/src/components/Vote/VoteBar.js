import React, { useEffect, useRef, memo } from 'react'
import { FaStar } from "react-icons/fa";

const VoteBar = ({number, countRatings, ratingTotal}) => {
    const percentRef = useRef()
    useEffect(()=>{
        percentRef.current.style.cssText = `right: ${Math.round(countRatings*100/ratingTotal)}px`
    },[countRatings, ratingTotal])
  return (
    <div className='flex items-center gap-2'>
        <div className='flex items-center p-2 w-1/5 justify-center'>
            <span className='w-[10px]'>{number}</span>
            <span><FaStar color='orange'/></span>
        </div>
        <div className='w-3/5'>
            <div className='w-full relative bg-gray-200 h-[10px] rounded-full'>
                <div ref={percentRef} className='absolute inset-0 bg-red-500 rounded-full'></div>
            </div>
        </div>
        <div className='w-1/5 flex justify-center'>
            {`${countRatings || 0} reviewer`}
        </div>
    </div>
  )
}

export default memo(VoteBar)