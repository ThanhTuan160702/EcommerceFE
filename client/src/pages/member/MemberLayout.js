import React from 'react'
import { Outlet} from 'react-router-dom'
import { MemberSidebar } from '../../components'

const MemberLayout = () => {

  return (
    <div className='flex w-full bg-gray-300 min-h-screen relative text-black'>
      <div className='w-[20%] flex-none top-0 bottom-0 fixed'>
        <MemberSidebar />
      </div>
      <div className='w-[20%]'></div>
      <div className='flex-auto'>
        <Outlet />
      </div>
    </div>
  )
}


export default MemberLayout