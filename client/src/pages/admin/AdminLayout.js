import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux'
import { AdminSidebar } from '../../components'

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user)
  if(!isLoggedIn || !current || +current.role !== 9999) return <Navigate to={`/${path.HOME}`} replace={true} />


  return (
    <div className='flex w-full bg-gray-300 min-h-screen relative text-black'>
      <div className='w-[20%] flex-none top-0 bottom-0 fixed'>
        <AdminSidebar />
      </div>
      <div className='w-[20%]'></div>
      <div className='flex-auto'>
        <Outlet />
      </div>
    </div>
  )
}


export default AdminLayout