import React,{ Fragment, memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { memberSidebar } from '../../utils/contants'
import { NavLink } from 'react-router-dom'
import path from '../../utils/path'
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from 'react-redux'

const MemberSidebar = () => {

    const [isTabs, setIsTabs] = useState([])

    const handleShowParent = (tabId) => {
        if(isTabs.some(el => el === tabId)) setIsTabs(prev => prev.filter(el => el!== tabId))
        else setIsTabs(prev => [...prev, tabId])
    }

  return (
    <div className='flex flex-col py-4 bg-slate-100 h-full'>
        <Link to={`/${path.HOME}`}>
            <div className='cursor-pointer w-full flex justify-center gap-2 p-2'>
                <span className='text-black'>Shop</span>
                <span className='text-main font-semibold'>ThanhTuan</span>
            </div>
        </Link>
        <div>
            {memberSidebar?.map((el) =>(
                <Fragment key={el.id}>
                    {el.type === 'single' && <NavLink to={el.path} key={el.id} className={({isActive}) => isActive ? `py-3 px-4 text-black flex items-center justify-start gap-1 bg-gray-300` : `py-3 px-4 text-black flex items-center justify-start gap-1 rounded-full`}>
                        <span>{el.icon}</span>
                        <span>{el.text}</span>
                    </NavLink>}
                    {el.type === 'parent' && <div key={el.id} className='text-black flex flex-col justify-start'>
                        <div onClick={() => handleShowParent(+el.id)} className='px-4 py-3 flex justify-between items-center cursor-pointer rounded-full'>
                            <div className='flex items-center gap-1'>
                                <span>{el.icon}</span>
                                <span>{el.text}</span>
                            </div>
                            <FaChevronDown />
                        </div>
                        {isTabs.some(id => id === el.id) &&  <div className='flex flex-col justify-start animate-slideInFromTop'>
                            {el.submenu.map((e)=>(
                                <NavLink className={({isActive}) => isActive ? 'p-8 py-3 flex items-center bg-gray-300 gap-1' : 'pl-8 py-3 flex items-center gap-1'} key={e.text} to={e.path}>
                                    <span>{e.icon}</span>
                                     <span>{e.text}</span>
                                </NavLink>
                            ))}
                        </div>}
                    </div>}
                </Fragment>
            ))}
        </div>
    </div>
  )
}

export default memo(MemberSidebar)