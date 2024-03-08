import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Navigation, TopHeader, Footer, Loading } from '../../components/index'
import { useSelector } from 'react-redux'

const Public = () => {

  const { isLoading } = useSelector(state => state.products)

  return (
    <div className='relative'>
      {isLoading && <div className='absolute flex items-center justify-center w-full h-screen bg-opacity z-50'>
        <Loading/>
      </div>}
      <div className='w-full flex flex-col items-center'>
          <TopHeader/>
          <Header/>
          <Navigation/>
        <div className='w-full flex items-center flex-col'>
          <Outlet/>
        </div>
        <Footer />
      </div>
  </div>
  )
}

export default Public