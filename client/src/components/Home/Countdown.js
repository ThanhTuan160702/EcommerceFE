import React, { memo } from 'react'

const Countdown = ({unit, number}) => {
  return (
    <div className='w-full h-[60px] bg-gray-100 flex justify-center items-center rounded-md flex-col'>
      <span className='text-[18px] text-gray-800'>{number}</span>
      <span className='text-xs text-gray-700'>{unit}</span>
    </div>
  )
}

export default memo(Countdown)