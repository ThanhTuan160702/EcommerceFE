import React, { useEffect, useState } from 'react'
import { apiGetOrders } from '../../apis/order'

const MyOrder = () => {

  const [orders, setOrders] = useState(null)

  const fetchOrders = async() => {
    const response = await apiGetOrders()
    if(response.success){
      setOrders(response)
    }
  }

  useEffect(() => {
    fetchOrders()
  },[orders])

  return (
    <div>
      {orders?.map((el)=>(
        <div>{el}</div>
      ))}
    </div>
  )
}

export default MyOrder