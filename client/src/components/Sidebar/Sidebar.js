import React from 'react'
import { NavLink } from 'react-router-dom'
import { formatSlug } from '../../utils/helper'
import { useSelector } from 'react-redux'

const Sliderbar = () => {

  const { categories } = useSelector(state => state.app)

  return (
    <div className='flex flex-col justify-around border h-[400px]'>
      {categories?.map(el=>(
        <NavLink key={formatSlug(el.title)} to={`${formatSlug(el.title)}`} 
        className={({isActive}) =>  isActive ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main" : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main" }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  )
}

export default Sliderbar